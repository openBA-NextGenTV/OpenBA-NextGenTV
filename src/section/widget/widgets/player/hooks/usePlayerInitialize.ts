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

import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

import { resumeRmpPlayback, stopRmpPlayback } from '../../../../../hooks';

export const usePlayerInitialize = (url: string) => {
  const videoRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  useEffect(() => {
    if (!videoRef.current || !url) {
      return;
    }

    let hls: Hls;
    stopRmpPlayback();

    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl') || getExtension(url) === 'mp4') {
      videoRef.current.src = url;
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      videoRef.current && hls.attachMedia(videoRef.current);
    } else {
      console.error(`${url} - Media type is not supported1`);
    }

    return () => {
      hls?.destroy();
      resumeRmpPlayback();
    };
  }, [url]);

  return videoRef;
};

const getExtension = (url: string) => {
  const urlSplited = url.split('.');
  return urlSplited.length > 0 ? urlSplited[urlSplited.length - 1] : '';
};
