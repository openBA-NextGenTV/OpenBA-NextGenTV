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

import { useCallback, useEffect, useRef } from 'react';

import { Command, registerView, unregisterView } from '../../../../../../../../hooks';

export const useControlPlayPauseVideo = (pageActive: boolean, setPageActive: (a: boolean) => void) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };
  const commandListener = useCallback(
    (command: Command) => {
      switch (command) {
        case 'Enter': {
          if (videoRef.current && pageActive) {
            playPause();
          }
          break;
        }
        case 'ArrowLeft': {
          setPageActive(false);
        }
      }

      return false;
    },
    [pageActive, setPageActive],
  );

  useEffect(() => {
    if (pageActive) {
      registerView({ viewId: 'MediaResolver', listener: commandListener });
    } else {
      unregisterView({ viewId: 'MediaResolver' });
    }
    return () => {
      unregisterView({ viewId: 'MediaResolver' });
    };
  }, [pageActive, commandListener]);

  const mediaClickHandler = () => {
    if (videoRef.current && pageActive) {
      playPause();
    } else {
      setPageActive(true);
    }
  };

  return { videoRef, mediaClickHandler };
};
