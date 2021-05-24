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

import { useWidgetControl } from '../../../../../hooks';
import { WidgetComponentProps } from '../../../Widget';
import { usePlayerInitialize } from '../hooks';
import { Container, Header, Image, ImageWrapper } from './Player.styles';
import { AudioWidget } from './Player.types';

export const AudioPlayer: FC<WidgetComponentProps> = ({ widget: { payload } }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const widget: AudioWidget = JSON.parse(payload!);
  const audioRef = usePlayerInitialize(widget.url) as RefObject<HTMLAudioElement>;

  useWidgetControl('AudioPlayer');

  return (
    <Container>
      <Header>{`Now Playing - ${widget.label}`}</Header>

      <ImageWrapper>
        <Image src="icons/generic_radio_icon.png" alt="Image" />
      </ImageWrapper>

      <audio ref={audioRef} autoPlay />
    </Container>
  );
};
