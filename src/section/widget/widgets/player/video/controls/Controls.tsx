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

import { FC, RefObject } from 'react';

import { useMenusModel } from '../../../../../../state';
import { VideoControlInstruction, VideoControls } from './Controls.styles';
import { useClicks, useKeyBoard } from './hooks';
import { ProgressBar } from './progressBar';

type VideoControlProps = {
  playerRef: RefObject<HTMLVideoElement>;
  disablePlaybackInteraction: boolean;
  paused: boolean;
  progress: number;
};

export const Controls: FC<VideoControlProps> = ({ playerRef, disablePlaybackInteraction, paused, progress }) => {
  const { isVisible: isMenuVisible } = useMenusModel();
  const { isHidden, isPanelHidden } = useKeyBoard(playerRef, disablePlaybackInteraction, paused);
  useClicks(playerRef, disablePlaybackInteraction, paused);

  if (isMenuVisible || disablePlaybackInteraction || isHidden) {
    return <></>;
  }

  return (
    <VideoControls hidden={isPanelHidden}>
      <ProgressBar progress={progress} paused={paused} />
      <VideoControlInstruction src="widget/video/instruction.png" />
    </VideoControls>
  );
};
