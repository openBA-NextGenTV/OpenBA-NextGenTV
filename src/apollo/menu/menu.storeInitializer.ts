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

import { ApolloClient } from '@apollo/client';

import { GetMenuDocument, GetMenuIsDisableDocument, GetMenuIsVisibleDocument, Menu } from '../generated/graphql';
import { createMenu, createMetric, createWidget } from '../typeFactory';
import menuConfig from './menuConfig.json';

export const initMenuStore = (client: ApolloClient<any>) => {
  client.writeQuery({ query: GetMenuIsVisibleDocument, data: { menuIsVisible: false } });
  client.writeQuery({ query: GetMenuIsDisableDocument, data: { menuIsDisable: false } });
  client.writeQuery({ query: GetMenuDocument, data: { menu: rootMenu } });
};

// TODO avoid any
const createMenuRecursively = (config: any): Menu => {
  const menu = createMenu(config);
  const widgetConfig = config.widget;
  const metric = widgetConfig?.metric
    ? createMetric(widgetConfig.metric.page, widgetConfig.metric.title || undefined)
    : null;
  const payload = JSON.stringify(widgetConfig?.payload);
  const widget = widgetConfig ? createWidget(widgetConfig?.type, payload, metric) : null;
  const items =
    widget || config.items === null ? null : config.items?.map((item: any) => createMenuRecursively(item)) || [];

  return {
    ...menu,
    items,
    widget,
  };
};

const rootMenu = createMenuRecursively(menuConfig);
