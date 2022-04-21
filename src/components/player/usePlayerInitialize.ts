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

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { getFileExtensionFromUrl } from 'utils/fileHelpers';
import { resumeRmpPlayback, stopRmpPlayback } from '../../services/websocket';

export const usePlayerInitialize = (url: string | undefined) => {
  const videoRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  useEffect(() => {
    let hls: Hls;

    stopRmpPlayback();

    if (videoRef.current && url) {
      if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl') ||
        getFileExtensionFromUrl(url) === 'mp4'
      ) {
        videoRef.current.src = url;
      } else if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        if (videoRef.current) hls.attachMedia(videoRef.current);
      }
    }

    return () => {
      hls?.destroy();
      resumeRmpPlayback();
    };
  }, [url]);

  return videoRef;
};
