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

import { FC, RefObject, useCallback, useMemo } from 'react';
import { PLAYER } from 'configs/ineractiveGroupViewId';
import { useGAvideoProgress } from 'hooks/useGAvideoProgress';
import { Command } from 'types/Command';
import { InteractiveGroup } from 'components/interactive';
import { plugHandler } from 'utils/navigation';
import { useControls } from '../../hooks/useControls';
import { usePlaybackProgress } from '../../hooks/usePlaybackProgress';
import { Commands, Progress } from './components';
import { Container } from './Styles';

interface Props {
  controlsDisabled: boolean;
  isFullScreen: boolean;
  isFullScreenAllowed: boolean;
  isStream: boolean;
  playerRef: RefObject<HTMLVideoElement>;
  setIsFullScreen: (isFullScreen: boolean) => void;
  category?: string;
  title?: string;
}

const fullScreenComands = [
  Command.ArrowUp,
  Command.ArrowDown,
  Command.Enter,
  Command.ArrowLeft,
  Command.ArrowRight,
  Command.Backspace,
];

const notFullScreenComands = [
  Command.Enter,
  Command.ArrowLeft,
  Command.ArrowRight,
  Command.Backspace,
];

export const Controls: FC<Props> = ({
  playerRef,
  isFullScreen,
  setIsFullScreen,
  isFullScreenAllowed,
  controlsDisabled,
  isStream,
  title,
  category,
}) => {
  const { progress, paused, duration, timeHasPassed } = usePlaybackProgress(
    title,
    playerRef,
    isStream
  );

  const { handlePlayPause, handleRewind, handleFastForward } = useControls(playerRef);
  const times = useMemo(() => ({ duration, timeHasPassed }), [duration, timeHasPassed]);
  const openFullScreen = useCallback(() => setIsFullScreen(true), [setIsFullScreen]);
  const exitFullScreen = useCallback(() => setIsFullScreen(false), [setIsFullScreen]);
  const isFullScreenAndNotStream = isFullScreen && !isStream;
  const isProgressVisible = isFullScreenAndNotStream || !isFullScreenAllowed;
  const isControlsVisible = isFullScreen || !isFullScreenAllowed;
  const enterHanderForFullScreen = isStream ? plugHandler : handlePlayPause;
  const enterHandler = isControlsVisible ? enterHanderForFullScreen : openFullScreen;
  const rightHandler = isFullScreenAndNotStream ? handleFastForward : plugHandler;
  const leftHandler = isFullScreenAndNotStream ? handleRewind : plugHandler;

  useGAvideoProgress(category, title, progress);

  return (
    <InteractiveGroup
      viewId={PLAYER}
      customEnterHandler={enterHandler}
      customHandlerUp={plugHandler}
      customHandlerRight={rightHandler}
      customHandlerDown={plugHandler}
      customHandlerLeft={leftHandler}
      customBackHandler={exitFullScreen}
      handleCommands={isFullScreen ? fullScreenComands : notFullScreenComands}
      isUnique={isFullScreen}
      groupActive={!controlsDisabled}
      ignoreDirection
    >
      <Container isVisible={isControlsVisible}>
        {isFullScreen && <Commands paused={paused} isStream={isStream} />}
        {isProgressVisible && (
          <Progress progress={progress} times={times} isFullScreen={isFullScreen} />
        )}
      </Container>
    </InteractiveGroup>
  );
};
