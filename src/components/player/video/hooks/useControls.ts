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

/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import { RefObject, useCallback } from 'react';

export const SKIP_SECONDS = 10;
const BACK_WAY = 'back';
const FORWARD_WAY = 'forward';

export const useControls = (playerRef: RefObject<HTMLVideoElement>) => {
  const handlePlayPause = useCallback(() => {
    if (playerRef.current?.paused) {
      if (playerRef.current?.currentTime == playerRef.current?.duration) {
        playerRef.current.currentTime = 0;
      }

      playerRef.current?.play();
    } else {
      playerRef.current?.pause();
    }
  }, [playerRef]);

  const changeVideoCurrentTime = useCallback(
    (way) => {
      const currentTime = playerRef.current?.currentTime || 0;
      const duration = playerRef.current?.duration;
      const wayIsBack = way === BACK_WAY;
      const isCurrentTimeNumber = typeof playerRef?.current?.currentTime === 'number';

      if (isCurrentTimeNumber && wayIsBack && currentTime !== 0) {
        playerRef.current.currentTime -= SKIP_SECONDS;
      }

      if (isCurrentTimeNumber && !wayIsBack && currentTime !== duration) {
        playerRef.current.currentTime += SKIP_SECONDS;
      }
    },
    [playerRef]
  );

  const handleRewind = useCallback(() => {
    changeVideoCurrentTime(BACK_WAY);
  }, [changeVideoCurrentTime]);

  const handleFastForward = useCallback(() => {
    changeVideoCurrentTime(FORWARD_WAY);
  }, [changeVideoCurrentTime]);

  return {
    handlePlayPause,
    handleRewind,
    handleFastForward,
  };
};
