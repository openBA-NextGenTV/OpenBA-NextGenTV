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

import { Alert, FlashChannel, Menu } from '../generated/graphql';
import { createMenu, createMetric, createWidget } from '../typeFactory';

export const createNowWatchingMenuItem = (flashChannel: FlashChannel) =>
  createMenu({
    id: 'menu_watch_now',
    title: 'menu.watch_now',
    items: [
      createMenu({
        ...flashChannel,
        items: null,
        widget: createWidget(
          'videoPlayer',
          JSON.stringify({
            url: flashChannel.videoUrl,
            isFlashChannel: true,
            isStream: true,
            title: flashChannel.title,
            thumbnail: flashChannel.thumbnail,
          }),
          createMetric('Flash Channel'),
        ),
      }),
    ],
  });

export const addNowWatchingToMenu = (menu: Menu, nowWatchingMenuItem: Menu, setBeforeItemId: string) => {
  const menuWithoutNowWatching = removeNowWatchingFromMenu(menu, nowWatchingMenuItem);
  const newMenuItems = menuWithoutNowWatching.items && [...menuWithoutNowWatching.items];

  const indexOfSettingsMenuItem = newMenuItems?.findIndex(item => item.id === setBeforeItemId);
  if (indexOfSettingsMenuItem) {
    newMenuItems?.splice(indexOfSettingsMenuItem, 0, nowWatchingMenuItem);
    return { ...menu, items: newMenuItems };
  }

  newMenuItems?.push(nowWatchingMenuItem);
  return { ...menu, items: newMenuItems };
};

export const removeNowWatchingFromMenu = (menu: Menu, nowWatchingMenuItem: Menu) => ({
  ...menu,
  items: menu.items?.filter(menu => menu.id !== nowWatchingMenuItem.id),
});

export const updateSelectedItemInMenu = (menu: Menu, nowWatchingMenuItem: Menu, setSelectedItemId: string) => ({
  ...menu,
  items: menu.items?.map(menu =>
    menu.id === setSelectedItemId && nowWatchingMenuItem.selected ? { ...menu, selected: true } : menu,
  ),
});

export const createAlertFromFlashChannel = (flashChannel: FlashChannel) =>
  ({
    id: flashChannel.channelId,
    alertBarTitle: flashChannel.title,
    menuTitle: flashChannel.title,
    latestPublishTime: 0,
    expire: flashChannel.expireTime,
    priority: 'EMERGENCY',
    targets: [],
    eventCode: 'FlashChannel',
    pages: [
      {
        id: flashChannel.channelId,
        imageUrl: '',
        story: `${flashChannel.title} is currently available. Please choose "Watch now" from the menu to view more information.`,
        title: 'Watch now available',
      },
    ],
  } as Alert);
