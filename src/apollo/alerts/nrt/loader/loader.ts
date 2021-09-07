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

import { getPriorityByNumber } from '../../../../state/useAlerts/alerts.util';
import { Alert, Page } from '../../../generated/graphql';
import { getAlertBgColor, getAlertIconPath } from '../../alertProps';
import { AlertFeed, AlertType } from './loader.types';

export const loader = async (pathToAlert: string): Promise<Alert[]> => {
  const json: any = await loadJson(pathToAlert);

  if (!json) {
    return [];
  }

  const { alerts, alertFeeds } = getData(json);

  if (!alerts.length) {
    return [];
  }

  // convert trigger.json alerts into BA's model
  return mapAlerts(alerts, alertFeeds, pathToAlert);
};

const loadJson = async (pathToAlert: string) =>
  fetch(pathToAlert + 'dynamic/trigger/trigger.json', { cache: 'no-cache' })
    .then(response => response.json())
    .catch(() => {
      // nothing to do
    })
    .catch(() => {
      // do nothing
    });

const getData = (json: any) => {
  const data: any = json['trigger']['trigger-data'];
  const key = Object.keys(data).find(key => data[key].type === 'horizontalBarAlert');

  if (!key) {
    return {
      alerts: [],
      alertFeeds: [],
    };
  }

  const alerts: AlertType[] = data[key].data;
  const alertFeeds: AlertFeed[] = json['alert-feed'];

  return {
    alerts,
    alertFeeds,
  };
};

const mapAlerts = (alerts: AlertType[], alertFeeds: AlertFeed[], pathToAlert: string) =>
  alerts.map(triggerAlert => {
    const {
      text,
      originalPublishTime,
      latestPublishTime,
      expire,
      priority,
      linkAppInfo: { guid },
      targets,
      eventCode,
    } = triggerAlert;

    const alertFeed = alertFeeds.find(feed => feed.guid === guid);

    return {
      id: originalPublishTime + '',
      alertBarTitle: text,
      menuTitle: alertFeed?.title || '',
      latestPublishTime,
      expire,
      priority: getPriorityByNumber(priority),
      targets,
      eventCode,
      iconPath: getAlertIconPath(eventCode),
      bgColor: getAlertBgColor(eventCode),
      pages:
        alertFeed?.pages.map(feed => {
          const result: Page = {
            id: feed.title,
            title: feed.title,
            story: feed.story,
            mediaUrl: null,
          };

          if (feed.media.length) {
            result.mediaUrl = pathToAlert + feed.media[0].thumbnail.replace('../', '') || null;
          }

          return result;
        }) || [],
    } as Alert;
  });
