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

import { useGoogleAnalytics } from '../../../../../../hooks';
import { VideoPayload } from '../../types/Video.types';

const FETCH_PROGRESS_INTERVAL = 1000;

export const useTrackVideoProgress = (
  payload: VideoPayload,
  videoRef: RefObject<HTMLVideoElement>,
  isStream: boolean,
) => {
  const { trackVideoProgress } = useGoogleAnalytics();

  useEffect(() => {
    if (isStream) {
      return;
    }

    const fetchProgressInterval = setInterval(() => {
      const progress = Math.floor(
        videoRef.current && videoRef.current.duration
          ? (videoRef.current.currentTime * 100) / videoRef.current.duration
          : 0,
      );

      trackVideoProgress(payload.categoryOfVideo, payload.title, progress);
    }, FETCH_PROGRESS_INTERVAL);

    return () => clearInterval(fetchProgressInterval);
  }, [videoRef, trackVideoProgress, payload.categoryOfVideo, payload.title, isStream]);
};
