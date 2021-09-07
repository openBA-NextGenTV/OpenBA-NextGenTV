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

import { getAlertBgColor, getAlertIconPath } from '../alerts/alertProps';
import { Alert, Page } from '../generated/graphql';
import { addType } from './utils';

export const createAlert = (alert: Alert) => {
  const result: Alert = {
    id: alert.id,
    alertBarTitle: alert.alertBarTitle,
    menuTitle: alert.menuTitle,
    latestPublishTime: alert.latestPublishTime,
    expire: alert.expire,
    priority: alert.priority,
    targets: alert.targets,
    eventCode: alert.eventCode,
    iconPath: getAlertIconPath(alert.eventCode),
    bgColor: getAlertBgColor(alert.eventCode),
    pages: alert.pages.map(page => createPage(page)),
  };

  addType(result, 'Alert');

  return result;
};

const createPage = (page: Page) => {
  const result: Page = { id: page.id, title: page.title, story: page.story, mediaUrl: page.mediaUrl };

  addType(result, 'Page');

  return result;
};
