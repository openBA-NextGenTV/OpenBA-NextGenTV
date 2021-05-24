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

import { FlashChannel } from '../generated/graphql';
import { addType } from './utils';

export const createFlashChannel = (flashChannel: FlashChannel) => {
  const result: FlashChannel = {
    id: '1',
    channelId: flashChannel.id,
    isLive: flashChannel.isLive,
    title: flashChannel.title,
    thumbnail: flashChannel.thumbnail,
    videoUrl: flashChannel.videoUrl,
    expireTime: flashChannel.expireTime,
  };

  addType(result, 'FlashChannel');

  return result;
};
