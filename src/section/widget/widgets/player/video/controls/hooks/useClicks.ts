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

import { RefObject, useEffect } from 'react';

import { useMenusModel, useMenusOperations } from '../../../../../../../state';
import { useDoubleClick } from '../../../hooks';
import { useAutoHide } from '.';
import { useTogglePayback } from './useTogglePayback';

export const useClicks = (
  playerRef: RefObject<HTMLVideoElement>,
  disablePlaybackInteraction: boolean,
  paused: boolean,
) => {
  const { showMenu, hideMenu } = useMenusOperations();
  const { resetHideState } = useAutoHide();
  const { isVisible: isMenuVisible } = useMenusModel();
  const [togglePlayPause] = useTogglePayback(playerRef, paused);

  const handleClick = useDoubleClick(
    () => (isMenuVisible ? hideMenu() : showMenu()),
    () => {
      if (!playerRef.current || disablePlaybackInteraction) {
        return;
      }
      togglePlayPause();
      resetHideState();
    },
  );

  useEffect(() => {
    const listener = playerRef.current;
    listener?.removeEventListener('click', handleClick);
    listener?.addEventListener('click', handleClick);

    return () => {
      listener?.removeEventListener('click', handleClick);
    };
  }, [playerRef, handleClick]);
};
