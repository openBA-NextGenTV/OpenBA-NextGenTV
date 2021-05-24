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

import { ApolloClient, gql } from '@apollo/client';

import { alertFilter, sortByPriority } from '../../state/useAlerts/alerts.util';
import {
  addNowWatchingToMenu,
  createAlertFromFlashChannel,
  createNowWatchingMenuItem,
  removeNowWatchingFromMenu,
  updateSelectedItemInMenu,
} from '../flashChannel/flashChannel.utils';
import {
  AppConfig,
  DeviceInfo,
  FeatureFlags,
  GetAlertsDocument,
  GetAlertsQuery,
  GetFipsDocument,
  GetFipsQuery,
  GetFlashChannelDocument,
  GetFlashChannelQuery,
  GetMenuDocument,
  GetMenuQuery,
  GetPriorityDocument,
  GetPriorityQuery,
  Menu,
} from '../generated/graphql';
import { fetchFeeds } from './feedFetcher';
import { createMenuItemsFromAlerts } from './menu.utils';

const getFeedProviderEndpointUrlQuery = gql`
  query getFeedProviderEndpointUrl {
    appConfig @client {
      endpoints {
        feedProviderUrl
      }
    }
  }
`;

const GET_STATION = gql`
  query getStation {
    deviceInfo @client {
      station
    }
  }
`;

const getMenuItemsDisabledQuery = gql`
  query getMenuItemsDisabledQuery {
    appConfig @client {
      featureFlags {
        menuItemsDisabled
        disableAlerts
      }
    }
  }
`;

const isAlertsDisabled = (client: ApolloClient<any>) => {
  const featureFlags = client.readFragment<FeatureFlags>({
    id: 'FeatureFlags:1',
    fragment: gql`
      fragment readFeatureFlags on FeatureFlags {
        disableAlerts
      }
    `,
  });

  return featureFlags?.disableAlerts || false;
};

export const initMenuWatchers = (client: ApolloClient<any>) => {
  if (!isAlertsDisabled(client)) {
    client.watchQuery({ query: GetAlertsDocument }).subscribe(() => populateMenuByAlertsAndFlashChanel(client));
    client.watchQuery({ query: GetPriorityDocument }).subscribe(() => populateMenuByAlertsAndFlashChanel(client));
    client.watchQuery({ query: GetFipsDocument }).subscribe(() => populateMenuByAlertsAndFlashChanel(client));
    client.watchQuery({ query: GetFlashChannelDocument }).subscribe(() => populateMenuByAlertsAndFlashChanel(client));
  }

  client.watchQuery({ query: GetFlashChannelDocument }).subscribe(() => populateMenuByFlashChannel(client));
  client.watchQuery({ query: getFeedProviderEndpointUrlQuery }).subscribe(({ data }) => populateFeeds(client, data));
  client.watchQuery({ query: GET_STATION }).subscribe(({ data }) => processDeviceInfo(client, data));
  client.watchQuery({ query: getMenuItemsDisabledQuery }).subscribe(() => processHiddenMenu(client));
};

const populateMenuByAlertsAndFlashChanel = (client: ApolloClient<any>) => {
  const { menu } = client.readQuery({ query: GetMenuDocument }) as GetMenuQuery;

  const alertMenu = menu.items?.find(menu => menu.title === 'menu.alerts');

  if (!alertMenu || !alertMenu.items) {
    return;
  }

  const { alerts: alertsApollo } = client.readQuery({ query: GetAlertsDocument }) as GetAlertsQuery;
  const { fips } = client.readQuery({ query: GetFipsDocument }) as GetFipsQuery;
  const { priority } = client.readQuery({ query: GetPriorityDocument }) as GetPriorityQuery;
  const { flashChannel } = client.readQuery({ query: GetFlashChannelDocument }) as GetFlashChannelQuery;

  const alerts = alertsApollo
    .filter(alert => alertFilter(alert, fips, priority))
    .filter(alert => alert.pages.length > 0)
    .sort((a, b) => sortByPriority(a.priority, b.priority));

  if (flashChannel?.isLive) {
    alerts.unshift(createAlertFromFlashChannel(flashChannel));
  }

  const alertMenus = createMenuItemsFromAlerts(alertMenu.items, alerts);

  client.writeQuery({
    query: GetMenuDocument,
    data: {
      menu: {
        ...menu,
        items: menu.items?.map(item => (item === alertMenu ? { ...alertMenu, items: alertMenus } : item)),
      },
    },
  });

  processHiddenMenu(client);
};

const processHiddenMenu = (client: ApolloClient<any>) => {
  const featureFlags = client.readFragment<FeatureFlags>({
    id: 'FeatureFlags:1',
    fragment: gql`
      fragment readFeatureFlags on FeatureFlags {
        menuItemsDisabled
      }
    `,
  });

  if (featureFlags) {
    featureFlags.menuItemsDisabled.forEach((menuId: string) => {
      client.cache.evict({ id: `Menu:${menuId}` });

      client.cache.gc();
    });
  }

  if (isAlertsDisabled(client)) {
    client.cache.evict({ id: `Menu:menu_alerts` });
    client.cache.gc();
  }
};

const populateMenuByFlashChannel = (client: ApolloClient<any>) => {
  const channel = client.readQuery({ query: GetFlashChannelDocument }) as GetFlashChannelQuery;
  const flashChannel = channel?.flashChannel;
  const { menu } = client.readQuery({ query: GetMenuDocument }) as GetMenuQuery;
  const menuWatchNowItem = menu.items?.find(menu => menu.id === 'menu_watch_now');

  if (!flashChannel?.isLive) {
    if (!menuWatchNowItem) {
      return;
    }

    const menuWithoutNowWatching = removeNowWatchingFromMenu(menu, menuWatchNowItem);
    const updatedSelectedItemInMenu = updateSelectedItemInMenu(menuWithoutNowWatching, menuWatchNowItem, 'menu_alerts');

    putMenuIntoStore(client, updatedSelectedItemInMenu);
    return;
  }

  const nowWatchingMenuItem = menuWatchNowItem || createNowWatchingMenuItem(flashChannel);
  const menuWithNowWatching = addNowWatchingToMenu(menu, nowWatchingMenuItem, 'menu_settings');

  putMenuIntoStore(client, menuWithNowWatching);

  processHiddenMenu(client);
};

type FeedProviderEndpointUrlType = {
  appConfig: Pick<AppConfig, 'endpoints'>;
};

const populateFeeds = async (client: ApolloClient<any>, data: FeedProviderEndpointUrlType) => {
  if (!data?.appConfig?.endpoints.feedProviderUrl) {
    return;
  }

  const {
    appConfig: {
      endpoints: { feedProviderUrl },
    },
  } = data;

  const feedMenus: Menu[] = await fetchFeeds(feedProviderUrl);
  const { menu } = client.readQuery({ query: GetMenuDocument }) as GetMenuQuery;

  if (!menu.items) {
    return;
  }

  const newItems = menu.items.map(item => {
    const feedItem = feedMenus.find(feedMenu => feedMenu.title === item.title);
    return { ...item, items: feedItem?.items };
  });

  client.writeQuery({
    query: GetMenuDocument,
    data: {
      menu: { ...menu, items: newItems },
    },
  });

  processHiddenMenu(client);
};

type DeviceInfoProps = {
  deviceInfo: Pick<DeviceInfo, 'station'>;
};

const processDeviceInfo = (client: ApolloClient<any>, data: DeviceInfoProps) => {
  if (!data || !data.deviceInfo) {
    return;
  }

  const {
    deviceInfo: { station },
  } = data;

  // hardcoded temporary. Will be removed when SPA add footer image into appConfig
  if (station === 'preprod') {
    client.writeFragment({
      id: 'Menu:menu_root',
      fragment: gql`
        fragment footerImage on Menu {
          footerImage
        }
      `,
      data: {
        footerImage: 'sponsorship.png',
      },
    });
  }

  // check if menuLogo exist. It could be disabled by feature flag
  const menuLogo = client.readFragment({
    id: 'Menu:menu_logo',
    fragment: gql`
      fragment readId on Menu {
        id
      }
    `,
  });

  if (!menuLogo) {
    return;
  }

  client.writeFragment({
    id: 'Menu:menu_logo',
    fragment: gql`
      fragment logoMenu on Menu {
        thumbnail
      }
    `,
    data: {
      thumbnail: `stations/${station}/logo.png`,
    },
  });

  processHiddenMenu(client);
};

const putMenuIntoStore = (client: ApolloClient<any>, menu: Menu) => {
  client.writeQuery({
    query: GetMenuDocument,
    data: {
      menu,
    },
  });
};
