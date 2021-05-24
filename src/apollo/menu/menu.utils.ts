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

import { isUpdatedAlert } from '../../state/useAlerts/alerts.util';
import { Alert, Menu } from '../generated/graphql';
import { createMenu, createMetric, createWidget } from '../typeFactory';

export const createMenuItemsFromAlerts = (items: Menu[], alerts: Alert[]) =>
  alerts.map<Menu>(alert => {
    let item = items.find(item => item.id === alert.id);

    // existing menu alert
    if (item) {
      const widget = item.widget;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const isAlertRequireUpdateByLoadedAlert = widget ? isUpdatedAlert(JSON.parse(widget.payload!), alert) : false;

      if (isAlertRequireUpdateByLoadedAlert) {
        item.title = alert.menuTitle;

        if (widget) {
          widget.payload = JSON.stringify(alert);
        }
      }
    } else {
      item = createMenu({
        id: `menu_alerts_${alert.id}`,
        title: alert.menuTitle,
        items: null,
        widget: createWidget('alert', JSON.stringify(alert), createMetric('Alert')),
      });
    }

    return item;
  });
