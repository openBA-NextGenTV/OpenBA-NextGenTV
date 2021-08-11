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

import { RefObject, useCallback, useEffect, useState } from 'react';

import { Command, registerView, unregisterView } from '../../../../../../../hooks';
import { useMenusModel, useMenusOperations } from '../../../../../../../state';
import { useAutoHide } from './useAutoHide';
import { useTogglePayback } from './useTogglePayback';

const FAST_FORWARD_INTERVAL = 10;
const VideoControlsViewId = 'VideoControlsViewId';

export const useKeyBoard = (
  playerRef: RefObject<HTMLVideoElement>,
  disablePlaybackInteraction: boolean,
  paused: boolean,
) => {
  const [restoreControl, setRestoreControl] = useState(false);
  const { showMenu } = useMenusOperations();
  const { isHidden, resetHideState } = useAutoHide();
  const [isPanelHidden, setHidePanel] = useState(false);
  const { isVisible: isMenuVisible, isDisable } = useMenusModel();
  const [togglePlayPause] = useTogglePayback(playerRef, paused);

  const commandHandler = useCallback(
    (command: Command) => {
      resetHideState();
      switch (command) {
        case 'Enter':
          if (disablePlaybackInteraction || !playerRef.current) {
            return;
          }
          setHidePanel(false);
          togglePlayPause();
          break;
        case 'ArrowLeft':
          if (disablePlaybackInteraction || !playerRef.current) {
            return;
          }
          setHidePanel(false);
          playerRef.current.currentTime = playerRef.current.currentTime - FAST_FORWARD_INTERVAL;
          break;
        case 'ArrowUp':
          setHidePanel(false);
          break;
        case 'ArrowDown':
          setHidePanel(true);
          break;
        case 'ArrowRight':
          if (disablePlaybackInteraction || !playerRef.current) {
            return;
          }
          setHidePanel(false);
          playerRef.current.currentTime = playerRef.current.currentTime + FAST_FORWARD_INTERVAL;
          break;
        case 'Backspace':
          showMenu();
          setRestoreControl(true);
          break;
      }
    },
    [showMenu, playerRef, disablePlaybackInteraction, togglePlayPause, resetHideState],
  );

  useEffect(() => {
    if (isMenuVisible || isDisable) {
      unregisterView({ viewId: VideoControlsViewId });
    } else {
      registerView({
        viewId: VideoControlsViewId,
        listener: commandHandler,
      });
    }
    return () => unregisterView({ viewId: VideoControlsViewId });
  }, [isDisable, isMenuVisible, commandHandler, restoreControl]);

  return { isHidden, isPanelHidden };
};
