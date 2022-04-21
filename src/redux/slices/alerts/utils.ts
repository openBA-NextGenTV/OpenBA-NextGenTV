/*
 * Copyright © 2022 Sinclair Broadcast Group
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FIPS_WILDCARD, STAR_WILDCARD } from 'configs/wildCards';
import Parser from 'fast-xml-parser';
import { Alert, AlertInformation, AlertPriority, AlertState, Media } from 'types/Alert';
import { AlertListItem } from 'types/RawAlert';
import { getAlertBgColor, getAlertIconName } from './props';

export const parseAEAT = (alertingFragment: string) =>
  Parser.parse(alertingFragment, {
    ignoreAttributes: false,
    tagValueProcessor: (value, key) => {
      if (key === 'Location') {
        return `target:fips:${value}`;
      }

      return value;
    },
  });

export const supplementAlerts = (oldAlerts: Alert[], newAlerts: Alert[]) =>
  newAlerts.map((newAlert) => {
    const oldAlert = oldAlerts.find((item) => item.id === newAlert.id);

    if (
      oldAlert &&
      (oldAlert.latestPublishTime < newAlert.latestPublishTime ||
        newAlert.status === AlertState.CANCEL)
    ) {
      return {
        ...newAlert,
        status: newAlert.status !== AlertState.ALERT ? newAlert.status : AlertState.UPDATE,
        pages: oldAlert.pages,
      };
    }

    return {
      ...newAlert,
      status: oldAlert?.status || newAlert.status,
      pages: oldAlert?.pages || [],
      title: oldAlert?.title || newAlert.title,
    };
  });

const parseFips = (location: { '#text': string } | [{ '#text': string }]): string[] => {
  if (Array.isArray(location)) {
    return location.map((val) => val['#text']);
  }

  if (location['#text']) {
    return [location['#text']];
  }

  return ['*'];
};

const isAcceptableByFips = (incomingAlertFips: string[], fips: string | null | undefined) => {
  const acceptableFips = [`target:fips:${STAR_WILDCARD}`, `target:fips:${FIPS_WILDCARD}`];

  if (fips === `target:fips:${FIPS_WILDCARD}` || fips === undefined) {
    return true;
  }

  if (fips) {
    acceptableFips.push(fips);
  }

  return incomingAlertFips.some((incomingFips) => acceptableFips.includes(incomingFips));
};

export const alertFilter = (
  alert: Alert,
  fips: string | null | undefined,
  prioritySetting: AlertPriority
) => {
  if (Date.now() > alert.expire) {
    return false;
  }

  if (prioritySetting === AlertPriority.NO_ALERTS) {
    return false;
  }

  if (prioritySetting === AlertPriority.DIAGNOSTIC) {
    return true;
  }

  if (prioritySetting > alert.priority) {
    return false;
  }

  return isAcceptableByFips(alert.targets, fips);
};

export const actualizeAlertDemo = (a: any, updateAlerts: any[]): any => {
  const updatedStateIndex = updateAlerts.findIndex(
    (element) => element['@_refAEAId'] === a['@_aeaId']
  );

  if (updatedStateIndex !== -1) {
    return actualizeAlertDemo(updateAlerts.splice(updatedStateIndex, 1)[0], updateAlerts);
  }

  return a;
};

export const splitAlertOriginsAndUpdatesDemo = (alertsList: any[]) =>
  alertsList.reduce(
    ([alertsOrigins, updateAlerts], a: any) => {
      (a['@_aeaType'] === 'alert' ? alertsOrigins : updateAlerts).push(a);

      return [alertsOrigins, updateAlerts];
    },
    [[], []]
  );

export const getUniqueAlertsDemo = (alertsList: any[]) => {
  const [alertsOrigins, updateAlerts] = splitAlertOriginsAndUpdatesDemo(alertsList);
  const actualAlertsOrigins = alertsOrigins.map((a: any) => actualizeAlertDemo(a, updateAlerts));
  const actualUpdateAlerts = updateAlerts.map((a: any) => actualizeAlertDemo(a, [...updateAlerts]));

  return [...actualAlertsOrigins, ...actualUpdateAlerts];
};

export const getUniqueAlerts = (alerts: Array<any>) =>
  alerts.reduce((acb: Array<any>, aea) => {
    const aeaId = aea['@_aeaId'];
    const meterID = aeaId.split('_')[0];
    const header = aea.Header;
    const effective = new Date(header['@_effective']);
    const elementInArray = acb.find((alert) => alert['@_aeaId'].split('_')[0] === meterID);
    const alertCb = acb;

    if (elementInArray) {
      const index = acb.indexOf(elementInArray);

      if (effective > new Date(elementInArray.Header['@_effective'])) {
        alertCb[index] = aea;
      }
    } else {
      alertCb.push(aea);
    }

    return alertCb;
  }, []);

export const prepareAEATMedia = (mediaList: any) => {
  if (!mediaList) {
    return [];
  }

  return (Array.isArray(mediaList) ? mediaList : [mediaList]).map((media) => {
    const mediaCopy = { ...media };

    Object.keys(mediaCopy).forEach((key) => {
      mediaCopy[key.replace('@_', '')] = mediaCopy[key];
      delete mediaCopy[key];
    });

    return mediaCopy;
  });
};

export const getTinyUrlFromAEATMedia = (aeaMedia: Array<any>): string => {
  const tinyUrl: Array<string> = [];

  aeaMedia?.forEach(({ mediaType, alternateUrl }) => {
    if (mediaType === AlertInformation.QRCode) tinyUrl.push(alternateUrl);
  });

  // if there will be more than one media with type AlertInformationQRCode take first
  return tinyUrl.length ? tinyUrl[0] : '';
};

export const getMediasFromAEATMedia = (aeaMedia: Array<any>): Media[] =>
  aeaMedia.reduce((acc, { mediaType, alternateUrl, url, contentLength }) => {
    if (
      (mediaType === AlertInformation.Image || mediaType === AlertInformation.Video) &&
      alternateUrl &&
      url
    ) {
      acc.push({ alternateUrl, url, contentLength });
    }

    return acc;
  }, []);

export const transformAEATtoAlerts = (alertList: AlertListItem[], preferAEATDemo = false) => {
  if (!alertList) {
    return [];
  }

  const aeatObj = alertList.find((value: any) => value.alertingType === 'AEAT');

  if (!aeatObj) {
    return [];
  }

  const { alertingFragment } = aeatObj;

  if (!Parser.validate(alertingFragment)) {
    return [];
  }

  const xml = parseAEAT(alertingFragment);
  const alerts: any[] = Array.isArray(xml.AEAT.AEA) ? xml.AEAT.AEA : [xml.AEAT.AEA];

  const uniqueAlerts = preferAEATDemo
    ? getUniqueAlertsDemo(alerts)
    : getUniqueAlerts(alerts.filter((item: any) => item['@_aeaType'] === 'alert'));

  const items = uniqueAlerts.map((aea: any) => {
    const aeaId = aea['@_aeaId'];
    const priority = aea['@_priority'];
    const aeatMedia = prepareAEATMedia(aea.Media);
    const header = aea.Header;
    const aeaText = aea.AEAText['#text'];
    const effective = new Date(header['@_effective']);
    const expire = new Date(header['@_expires']);
    const eventCode = header.EventCode['#text'];
    const eventDesc = header.EventDesc['#text'];
    const fips = parseFips(header.Location);

    return {
      id: aeaId.split('_')[0],
      title: eventDesc,
      message: aeaText,
      expire: expire.getTime(),
      tinyUrl: getTinyUrlFromAEATMedia(aeatMedia),
      latestPublishTime: effective.getTime(),
      priority,
      iconName: getAlertIconName(eventCode),
      bgColor: getAlertBgColor(eventCode),
      targets: fips,
      wasPatchedWithNRT: false,
      eventCode,
      status: preferAEATDemo ? aea['@_aeaType'] : AlertState.ALERT,
      aeatMedia,
      pages: [],
      medias: getMediasFromAEATMedia(aeatMedia),
    };
  }) as Alert[];

  const sortedAlerts = items.sort((a, b) => b.latestPublishTime - a.latestPublishTime);

  return sortedAlerts || [];
};
