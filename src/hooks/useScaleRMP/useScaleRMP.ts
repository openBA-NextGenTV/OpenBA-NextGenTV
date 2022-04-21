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

import { useCallback } from 'react';
import { queryScalePosition } from 'services/websocket';
import { debounce } from 'utils/debounce';

const CONST_SCALE_DEBOUNCE_TIME = 20;
const debounced = debounce(CONST_SCALE_DEBOUNCE_TIME, queryScalePosition);

export const queryScalePositionWithDebounce = (options: {
  scaleFactor: number;
  xPos: number;
  yPos: number;
}) => {
  debounced(options);
};

export const useScaleRMP = () => {
  const scale = useCallback((width: number, height: number, alignMenuRight?: boolean) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const widthBA = ((windowWidth - width) / windowWidth) * 1e2;
    const heightBA = ((windowHeight - height) / windowHeight) * 1e2;
    const scaleFactorBA = Math.floor((width / windowWidth) * 100 * 1e2) / 1e2;
    const scaleFactorByWidth = scaleFactorBA > 10 ? scaleFactorBA : 10 || 100;
    const rightWidthBAbyW = alignMenuRight ? widthBA : 0;
    const xPosByW = Math.floor((100 - scaleFactorByWidth - rightWidthBAbyW) * 1e2) / 1e2 || 0;
    const yPosByW = Math.floor(((100 - scaleFactorByWidth - heightBA) / 2) * 1e2) / 1e2 || 0;
    const scaleFactorBAbyH = Math.floor((height / windowHeight) * 100 * 1e2) / 1e2;
    const rightWidthBAbyH = alignMenuRight ? widthBA * 2 : 0;
    const scaleFactorByHeight = scaleFactorBAbyH > 10 ? scaleFactorBAbyH : 10 || 100;

    const xPosByH =
      Math.floor(((100 - scaleFactorByHeight + widthBA - rightWidthBAbyH) / 2) * 1e2) / 1e2 || 0;

    const yPosByH = 0;

    try {
      if (scaleFactorByWidth > scaleFactorByHeight) {
        queryScalePositionWithDebounce({
          scaleFactor: scaleFactorByHeight,
          xPos: xPosByH,
          yPos: yPosByH,
        });
      } else {
        queryScalePositionWithDebounce({
          scaleFactor: scaleFactorByWidth,
          xPos: xPosByW,
          yPos: yPosByW,
        });
      }
    } catch (e) {
      throw new Error('Scale error');
    }
  }, []);

  return {
    scale,
    queryScalePositionWithDebounce,
  };
};
