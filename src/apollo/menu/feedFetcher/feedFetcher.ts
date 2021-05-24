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

import { v4 as uuidv4 } from 'uuid';

import { secondsToString } from '../../../utils';
import { createMenu, createMetric, createWidget } from '../../typeFactory';

export const fetchFeeds = async (url: string) => {
  const feedsData = await fetch(url);

  if (!feedsData.ok) {
    return [];
  }

  const idMenuItemsList: string[] = [];

  const feeds: Feed[] = await feedsData.json();

  return feeds.map(feed => {
    const createMenuItems = () =>
      feed.items.map(({ id, title, duration, thumbnailUrl, videoUrl }: FeedItem) => {
        const uniqueId = idMenuItemsList.includes(id) ? uuidv4() : id;
        idMenuItemsList.push(uniqueId);

        const widgetPayload = JSON.stringify({
          url: videoUrl,
          duration,
          categoryOfVideo: feed.category,
          title,
        });

        return createMenu({
          id: uniqueId,
          title: title,
          thumbnail: thumbnailUrl,
          items: null,
          subTitle: `Duration: ${secondsToString(duration)}`,
          widget: createWidget('videoPlayer', widgetPayload, createMetric(feed.id, title)),
        });
      });

    return createMenu({
      id: `menu_${feed.id}`,
      title: `menu.${feed.id}`,
      items: createMenuItems(),
    });
  });
};

type Feed = {
  id: string;
  category: string;
  items: FeedItem[];
};

type FeedItem = {
  id: string;
  title: string;
  duration: number;
  videoUrl: string;
  thumbnailUrl: string;
};
