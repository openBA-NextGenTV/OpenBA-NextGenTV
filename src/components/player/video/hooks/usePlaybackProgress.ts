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

import { RefObject, useEffect, useMemo, useState } from 'react';
import { convertTimeToString, EMPTY_TIME_STRING } from 'utils/time';

const SET_PROGRESS_INTERVAL = 300;
const DEFAULT_CURRENT_TIME_VALUE = 0;
const DEFAULT_DURATION_VALUE = 0;
const DEFAULT_PAUSED_VALUE = false;

export const usePlaybackProgress = (
  title: string | undefined,
  playerRef: RefObject<HTMLVideoElement>,
  isStream: boolean
) => {
  const [progress, setProgress] = useState<number>(0);
  const [paused, setPaused] = useState(DEFAULT_PAUSED_VALUE);
  const [timeHasPassed, setTimeHasPassed] = useState(EMPTY_TIME_STRING);
  const [duration, setDuration] = useState(EMPTY_TIME_STRING);

  useEffect(() => {
    const fetchProgressInterval =
      !isStream &&
      setInterval(() => {
        const playerRefCurrentTime = playerRef?.current?.currentTime || DEFAULT_CURRENT_TIME_VALUE;
        const playerRefDuration = playerRef?.current?.duration || DEFAULT_DURATION_VALUE;
        const playerRefPaused = playerRef?.current?.paused || DEFAULT_PAUSED_VALUE;

        const playerRefProgress = playerRefDuration
          ? Math.round((playerRefCurrentTime * 100) / playerRefDuration)
          : 0;

        const playerRefTimeHasPassed = convertTimeToString(playerRefCurrentTime);

        setDuration(convertTimeToString(playerRefDuration));
        setPaused(playerRefPaused);
        setProgress(Math.floor(playerRefProgress));
        setTimeHasPassed(playerRefTimeHasPassed);
      }, SET_PROGRESS_INTERVAL);

    return () => {
      if (fetchProgressInterval) {
        clearInterval(fetchProgressInterval);
        setProgress(0);
        setPaused(DEFAULT_PAUSED_VALUE);
        setTimeHasPassed(EMPTY_TIME_STRING);
        setDuration(EMPTY_TIME_STRING);
      }
    };
  }, [isStream, playerRef, title]);

  return useMemo(
    () => ({
      progress,
      paused,
      timeHasPassed,
      duration,
    }),
    [progress, paused, timeHasPassed, duration]
  );
};
