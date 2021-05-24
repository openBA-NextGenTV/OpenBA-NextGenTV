/*
 * Copyright 2021 OpenBA-NextGenTV Contributors (https://OpenBA-NextGenTV.tech)
 * Copyright 2021 Sinclair Broadcast Group, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Parser from 'fast-xml-parser';
import { v4 as uuidv4 } from 'uuid';

import { rpcClient } from '../../../hooks';
import { Alert, Priority } from '../../generated/graphql';

type Result = {
  alertList: AlertListItem[];
};

type AlertListItem = {
  alertingType: string;
  alertingFragment: string;
};

const alertPriorityMap: { [key: number]: Priority } = {
  0: Priority.Diagnostic,
  1: Priority.Low,
  2: Priority.Medium,
  3: Priority.High,
  4: Priority.Emergency,
};

export const watchAEATAlerts = (handleNewAlerts: (alerts: Alert[]) => void) => {
  const handleRpcMessage = (params: Result) => {
    if (!params || !params.alertList) {
      return;
    }

    const alertList = params.alertList;
    const aeatObj = alertList.find((value: any) => value.alertingType === 'AEAT');

    if (!aeatObj) {
      return;
    }

    const alertingFragment = aeatObj.alertingFragment;

    if (!Parser.validate(alertingFragment)) {
      return;
    }

    const xml = Parser.parse(alertingFragment, { ignoreAttributes: false });

    const alerts: any[] = (Array.isArray(xml.AEAT.AEA) ? xml.AEAT.AEA : [xml.AEAT.AEA]).filter(
      (item: any) => item['@_aeaType'] === 'alert',
    );

    const items = alerts.map(aea => {
      const aeaId = aea['@_aeaId'];
      const priority = aea['@_priority'];

      const header = aea.Header;
      const aeaText = aea.AEAText['#text'];
      const effective = new Date(header['@_effective']);
      const expire = new Date(header['@_expires']);
      const eventCode = header.EventCode['#text'];
      const eventDesc = header.EventDesc['#text'];
      const fips = parseFips(header.Location);
      const targets = fips.map((val: string) => `target:fips:${val}`);

      return {
        id: aeaId,
        alertBarTitle: eventDesc,
        menuTitle: eventDesc,
        expire: expire.getTime(),
        latestPublishTime: effective.getTime(),
        priority: alertPriorityMap[priority],
        targets,
        eventCode,
        pages: [
          {
            id: uuidv4(),
            title: eventDesc,
            story: aeaText,
            imageUrl: null,
          },
        ],
      };
    });

    handleNewAlerts(items);
  };

  rpcClient?.addListener('org.atsc.notify', handleRpcMessage);
  rpcClient?.call('org.atsc.subscribe', { msgType: ['alertingChange'] });
  (rpcClient?.call('org.atsc.query.alerting', { alertingTypes: ['AEAT'] }) as Promise<Result>).then(handleRpcMessage);
};

const parseFips = (location: { '#text': string } | [{ '#text': string }]): string[] => {
  if (Array.isArray(location)) {
    return location.map(val => val['#text']);
  }
  if (location['#text']) {
    return [location['#text']];
  }
  return ['*'];
};
