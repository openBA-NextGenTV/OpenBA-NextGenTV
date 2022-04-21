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
import { createSlice, current } from '@reduxjs/toolkit';
import { Alert, AlertState, Page } from 'types/Alert';
import { RawAlert, RawAlertFeed } from 'types/RawAlert';
import { getAEATAsync, getAlertNRT, getAlertsAsync } from './actions';
import { getAlertBgColor, getAlertIconName } from './props';
import { supplementAlerts, transformAEATtoAlerts } from './utils';

export interface InitialState {
  value: {
    alerts: Alert[];
    modalAlertId: string | undefined;
    openedAlerts: { [id: string]: number };
    selectedAlertId: string | undefined;
    error?: null;
  };
}

const initialState: InitialState = {
  value: { alerts: [], selectedAlertId: undefined, modalAlertId: undefined, openedAlerts: {} },
};

const getData = (json: any) => {
  const data: any = json.trigger['trigger-data'];
  const key = Object.keys(data).find((el) => data[el].type === 'horizontalBarAlert');

  if (!key) {
    return {
      alerts: [],
      alertFeeds: [],
    };
  }

  const alerts: RawAlert[] = data[key].data;
  const alertFeeds: RawAlertFeed[] = json['alert-feed'];

  return {
    alerts,
    alertFeeds,
  };
};

const mapAlerts = (alerts: RawAlert[], alertFeeds: RawAlertFeed[], pathToAlert: string) =>
  alerts.map((triggerAlert) => {
    const {
      text,
      originalPublishTime,
      latestPublishTime,
      expire,
      priority,
      linkAppInfo: { guid },
      targets,
      eventCode,
      title,
    } = triggerAlert;

    const alertFeed = alertFeeds.find((feed) => feed.guid === guid);

    return {
      id: `${originalPublishTime}`,
      title: title || '',
      message: text,
      latestPublishTime,
      expire,
      priority,
      targets,
      eventCode,
      iconName: getAlertIconName(eventCode),
      bgColor: getAlertBgColor(eventCode),
      pages:
        alertFeed?.pages.map((feed) => {
          const result: Page = {
            id: feed.title,
            title: feed.title,
            story: feed.story,
            mediaUrl: undefined,
          };

          if (feed.media.length) {
            result.mediaUrl = pathToAlert + feed.media[0].thumbnail.replace('../', '') || undefined;
          }

          return result;
        }) || [],
    } as Alert;
  });

const createPages = (alertFeed: RawAlertFeed, baseURI: string | null): Page[] => {
  if (!alertFeed) {
    return [];
  }

  return alertFeed.pages.map((page) => {
    let mediaUrl;

    if (page.media.length) {
      const pathToLocalResources = baseURI ? `${baseURI}/` : '';

      mediaUrl = pathToLocalResources + page.media[0].thumbnail.replace('../', '');
    }

    return { title: page.title, story: page.story, id: page.title, mediaUrl };
  });
};

const patchAlertsWithData = (
  alertToChange: Alert | undefined,
  alertFeed: RawAlertFeed,
  alertData: RawAlert,
  baseURI: string | null
) => {
  if (!alertToChange) {
    return null;
  }

  const pages = createPages(alertFeed, baseURI);

  const patchedAlert = {
    ...alertToChange,
    pages,
    title: alertToChange.title,
    latestPublishTime: alertData.latestPublishTime,
    wasPatchedWithNRT: true,
    status:
      alertToChange.status === AlertState.UPDATE ||
      (alertToChange.latestPublishTime < alertData.latestPublishTime &&
        alertToChange.wasPatchedWithNRT)
        ? AlertState.UPDATE
        : alertToChange.status,
  };

  return patchedAlert;
};

const actualizeSelectedAlerts = (openedAlerts: { [id: string]: number }, alerts: Alert[]) => {
  const newAlertsID = alerts.map((alert) => alert.id);

  return newAlertsID.reduce((obj, key) => ({ ...obj, [key]: openedAlerts[key] }), {});
};

const updateStatusToNew = (openedAlerts: { [id: string]: number }, alerts: Alert[]) =>
  alerts.map((alert) => {
    const needsUpdateToNew = alert.status === AlertState.ALERT && !openedAlerts[alert.id];
    const status = needsUpdateToNew ? AlertState.NEW : alert.status;

    return { ...alert, status };
  });

const removeUpdatedStatus = (openedAlerts: { [id: string]: number }, alerts: Alert[]) =>
  alerts.map((alert) => {
    const needsRemoveStatus =
      alert.status === AlertState.UPDATE && openedAlerts[alert.id] >= alert.latestPublishTime;

    const status = needsRemoveStatus ? AlertState.ALERT : alert.status;

    return { ...alert, status };
  });

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    selectAlert: (state, action) => {
      if (action.payload.alert) {
        state.value = {
          ...state.value,
          selectedAlertId: action.payload.alert?.id,
        };
      }
    },
    openAlertModal: (state) => {
      const selectAlert = state.value.alerts.find(
        (alert) => alert.id === state.value.selectedAlertId
      );

      const openedAlerts = { ...state.value.openedAlerts };

      if (selectAlert && state.value.selectedAlertId) {
        openedAlerts[state.value.selectedAlertId] = selectAlert.latestPublishTime;
      }

      if (selectAlert?.status === AlertState.NEW || selectAlert?.status === AlertState.UPDATE) {
        selectAlert.status = AlertState.ALERT;
      }

      state.value = {
        ...state.value,
        modalAlertId: state.value.selectedAlertId,
        openedAlerts,
      };
    },
    closeAlertModal: (state) => {
      state.value = { ...state.value, modalAlertId: undefined };
    },
    updateAlertsFromAEAT: (state, action) => {
      const alerts = transformAEATtoAlerts(
        action.payload.alertList,
        action.payload.preferAEATMessagesDemo
      );

      const {
        alerts: oldVersionOfAlerts,
        modalAlertId,
        selectedAlertId,
        openedAlerts,
      } = current(state).value;

      const newAlerts = supplementAlerts(oldVersionOfAlerts, alerts);
      const relevantOpenAlerts = actualizeSelectedAlerts(openedAlerts, newAlerts);
      const newAlertsWithNewState = updateStatusToNew(relevantOpenAlerts, alerts);

      const newAlertsWithUpdateState = removeUpdatedStatus(
        relevantOpenAlerts,
        newAlertsWithNewState
      );

      if (selectedAlertId && !newAlerts.some((a) => a.id === selectedAlertId)) {
        state.value.selectedAlertId = newAlerts[0]?.id;
      }

      if (modalAlertId && !newAlerts.some((a) => a.id === modalAlertId)) {
        state.value.modalAlertId = newAlerts[0]?.id;
      }

      if (!selectedAlertId && oldVersionOfAlerts.length === 0) {
        state.value.selectedAlertId = newAlerts[0]?.id;
      }

      state.value.openedAlerts = relevantOpenAlerts;
      state.value.alerts = newAlertsWithUpdateState;
    },
    removeExpiredAlerts: (state) => {
      const now = Date.now();
      const { modalAlertId, selectedAlertId, alerts } = current(state).value;
      const newAlerts = alerts.filter((a) => a.expire > now);

      state.value.alerts = newAlerts;

      if (selectedAlertId && !newAlerts.some((a) => a.id === selectedAlertId)) {
        state.value.selectedAlertId = newAlerts[0]?.id;
      }

      if (modalAlertId && !newAlerts.some((a) => a.id === modalAlertId)) {
        state.value.modalAlertId = newAlerts[0]?.id;
      }
    },
  },

  extraReducers: {
    [getAlertsAsync.fulfilled.toString()]: (state, action) => {
      const { alertFeeds, alerts } = getData(action.payload.alerts);
      const { baseURI } = action.payload;
      const pathToAlert = baseURI ? `${baseURI}/` : '';
      const newAlerts = mapAlerts(alerts, alertFeeds, pathToAlert);
      const oldAlerts = [...state.value.alerts];

      newAlerts.forEach((alert) => {
        const alertStatus = oldAlerts.some(
          ({ id, latestPublishTime, status }) =>
            alert.id === id &&
            (status === AlertState.UPDATE || alert.latestPublishTime !== latestPublishTime)
        )
          ? AlertState.UPDATE
          : AlertState.ALERT;

        return alertStatus;
      });

      state.value.alerts = newAlerts;
      state.value.selectedAlertId = newAlerts[0]?.id;
    },
    [getAlertsAsync.rejected.toString()]: (state, action) => {
      state.value.error = action.payload;
    },
    [getAEATAsync.fulfilled.toString()]: (state, action) => {
      const { alerts } = action.payload;
      const { openedAlerts } = state.value;

      state.value.selectedAlertId = alerts[0]?.id;

      const relevantOpenAlerts = actualizeSelectedAlerts(openedAlerts, alerts);
      const alertsWithNewState = updateStatusToNew(relevantOpenAlerts, alerts);
      const newAlertsWithUpdateState = removeUpdatedStatus(relevantOpenAlerts, alertsWithNewState);

      state.value.openedAlerts = relevantOpenAlerts;
      state.value.alerts = newAlertsWithUpdateState;
    },
    [getAlertNRT.fulfilled.toString()]: (state, action) => {
      const { nrt, alertId, baseURI } = action.payload;
      const { alertFeeds, alerts } = getData(nrt);
      const alert = state.value.alerts.find((item) => item.id === alertId);
      const newVersion = patchAlertsWithData(alert, alertFeeds[0], alerts[0], baseURI);

      state.value.alerts = state.value.alerts.map((item) =>
        item.id === alertId && newVersion ? newVersion : item
      );
    },
  },
});

export const { actions, reducer } = alertSlice;
export default reducer;
