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

import { RefObject, useEffect, useState } from 'react';

const FETCH_PROGRESS_INTERVAL = 400;

export const usePlaybackProgress = (playerRef: RefObject<HTMLVideoElement>) => {
  const [progress, setProgress] = useState<number>(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchProgressInterval = setInterval(() => {
      const progress = Math.floor(
        playerRef.current && playerRef.current.duration
          ? (playerRef.current.currentTime * 100) / playerRef.current.duration
          : 0,
      );
      setProgress(Math.floor(progress));

      setPaused(playerRef.current?.paused || false);
    }, FETCH_PROGRESS_INTERVAL);

    return () => clearInterval(fetchProgressInterval);
  }, [playerRef]);

  return {
    progress,
    paused,
  };
};
