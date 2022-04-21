/*
 * Copyright © 2022 Sinclair Broadcast Group
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { FC, RefObject, useState } from 'react';
import { Video as VideoProps } from 'types/Player';
import { usePlayerInitialize } from '../usePlayerInitialize';
import { Controls } from './components/Controls';
import { Container, Plug, Title, Video } from './Styles';

export const VideoPlayer: FC<VideoProps> = ({
  title,
  category,
  url,
  autoPlay = true,
  isFullScreenAllowed = true,
  controlsDisabled = false,
  isStream = false,
}) => {
  const playerRef = usePlayerInitialize(url) as RefObject<HTMLVideoElement>;
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <Container isFullScreen={isFullScreen} isFullScreenAllowed={isFullScreenAllowed}>
      {url ? (
        <>
          {(isFullScreen || !isFullScreenAllowed) && title && (
            <Title isFullScreen={isFullScreen}>{title}</Title>
          )}
          <Video ref={playerRef} src={url} autoPlay={autoPlay} />
          <Controls
            playerRef={playerRef}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            isFullScreenAllowed={isFullScreenAllowed}
            controlsDisabled={controlsDisabled}
            isStream={isStream}
            title={title}
            category={category}
          />
        </>
      ) : (
        <Plug>Unable to Load Video</Plug>
      )}
    </Container>
  );
};
