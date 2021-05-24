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

import { WidgetComponentProps } from '../../../index';
import { usePlayerInitialize } from '../hooks';
import { VideoPayload } from '../types/Video.types';
import { Controls } from './controls';
import { useGoToLinearFeed, useTrackVideoProgress } from './hooks';
import { usePlaybackProgress } from './hooks/usePlaybackProgress';
import { Container, Player } from './Player.styles';

export const VideoPlayer: FC<WidgetComponentProps> = ({ widget: { payload: payloadRaw } }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const payload: VideoPayload = JSON.parse(payloadRaw!);
  const playerRef = usePlayerInitialize(payload.url) as RefObject<HTMLVideoElement>;
  const { progress, paused } = usePlaybackProgress(playerRef);
  useTrackVideoProgress(payload, playerRef, !!payload.isStream);
  useGoToLinearFeed(payload);

  return (
    <Container>
      <Player autoPlay ref={playerRef} />
      <Controls
        playerRef={playerRef}
        disablePlaybackInteraction={!!payload.isStream}
        paused={paused}
        progress={progress}
      />
    </Container>
  );
};
