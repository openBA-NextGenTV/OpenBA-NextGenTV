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

import { FlashChannel } from '../../generated/graphql';

export const loader = async (url: string) => {
  const channel: any = await fetch(url, {
    cache: 'no-cache',
  })
    .then(response => response.json())
    .catch(() => {
      // nothing to do
    });

  const isExpired = channel?.expiresDateTime && channel.expiresDateTime < Date.now();

  if (!channel?.isLive || isExpired) {
    return null;
  }

  return {
    id: channel?.channelId || uuidv4(),
    isLive: channel?.isLive,
    videoUrl: channel?.videoUrl || '',
    thumbnail: channel?.thumbURL || '',
    title: channel?.title || 'Event Channel',
    expireTime: 0,
  } as FlashChannel;
};
