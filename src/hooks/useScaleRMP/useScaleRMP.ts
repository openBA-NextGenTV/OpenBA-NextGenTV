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

import { useCallback } from 'react';

import { queryScalePosition } from '../websocket';

export const useScaleRMP = () => {
  const scale = useCallback((width: number, height: number) => {
    const windowWidth = window.innerWidth;
    const scaleFactorBA = Math.floor((width / windowWidth) * 100 * 1e2) / 1e2;

    const scaleFactorByWidth = scaleFactorBA > 10 ? scaleFactorBA : 10 || 100;
    const xPosByW = Math.floor((100 - scaleFactorByWidth) * 1e2) / 1e2 || 0;
    const yPosByW = Math.floor(((100 - scaleFactorByWidth) / 2) * 1e2) / 1e2 || 0;

    const windowHeight = window.innerHeight;
    const scaleFactorBAbyH = Math.floor((height / windowHeight) * 100 * 1e2) / 1e2;
    const scaleFactorByHeight = scaleFactorBAbyH > 10 ? scaleFactorBAbyH : 10 || 100;
    const xPosByH = Math.floor(((100 - scaleFactorByHeight) / 2) * 1e2) / 1e2 || 0;
    const yPosByH = 0;

    try {
      if (scaleFactorByWidth > scaleFactorByHeight) {
        queryScalePosition({ scaleFactor: scaleFactorByHeight, xPos: xPosByH, yPos: yPosByH });
      } else {
        queryScalePosition({ scaleFactor: scaleFactorByWidth, xPos: xPosByW, yPos: yPosByW });
      }
    } catch (e) {
      // Nothing to do
    }
  }, []);

  return {
    scale,
  };
};
