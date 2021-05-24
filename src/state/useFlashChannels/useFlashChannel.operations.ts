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

import { useCallback } from 'react';

import { FlashChannel, useHideFlashChannelMutation } from '../../apollo/generated/graphql';
import { createMetric, createWidget } from '../../apollo/typeFactory';
import { useMenusOperations } from '../../state';
import { useWidgetOperations } from '../useWidget';

export const useFlashChannelOperations = () => {
  const [hideFlashChannelMutation] = useHideFlashChannelMutation();
  const { openWidget } = useWidgetOperations();
  const { showMenu, selectMenu } = useMenusOperations();

  const hideFlashChannel = useCallback(
    ({ channelId }: FlashChannel) =>
      hideFlashChannelMutation({
        variables: { flashChannel: { channelId } },
      }),
    [hideFlashChannelMutation],
  );

  const gotoChannel = useCallback(
    (flashChannel: FlashChannel) => {
      hideFlashChannel(flashChannel);
      showMenu();
      selectMenu(flashChannel.id);
      openWidget(
        createWidget(
          'videoPlayer',
          JSON.stringify({
            url: flashChannel.videoUrl,
            isFlashChannel: true,
            isStream: true,
            title: flashChannel.title,
          }),
          createMetric('Flash Channel'),
        ),
      );
    },
    [hideFlashChannel, showMenu, selectMenu, openWidget],
  );

  return {
    gotoChannel,
    hideFlashChannel,
  };
};
