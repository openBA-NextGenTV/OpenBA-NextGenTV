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

import { createMenu, createMetric, createWidget } from '../../typeFactory';
import { FeedItem } from './types';

export const fetchNews = async (url: string) => {
  const data = await fetch(url, {
    cache: 'no-cache',
  });

  if (!data.ok) {
    return [];
  }

  const items: FeedItem[] = await data.json();

  return items.map(({ id, title, duration, thumbnailUrl, videoUrl, category }: FeedItem) => {
    const widgetPayload = JSON.stringify({
      url: videoUrl,
      duration,
      categoryOfVideo: category,
      title,
    });

    return createMenu({
      id,
      title,
      thumbnail: thumbnailUrl,
      items: null,
      widget: createWidget('videoPlayer', widgetPayload, createMetric(`menu_newsOnDemand_${id}`, title)),
    });
  });
};
