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

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deviceSelectors } from 'redux/slices/device';
import { RootState } from 'redux/store';
import { AppConfig, DmaAppConfig } from 'types/Config';

export const fetchAppConfig = createAsyncThunk(
  'appConfig/fetchAppConfig',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const globalId = deviceSelectors.getGlobalId(state);

    try {
      if (!globalId) {
        throw new Error('GlobalId is undefined');
      }

      const { data: dmaAppConfig } = await axios
        .get<DmaAppConfig>(`stations/appConfig.json`)
        .catch(() => {
          throw new Error('Could not read dmaAppConfig');
        });

      const stationFromDmaAppConfig = dmaAppConfig?.stations?.[globalId];
      const stationFromGlobalId = globalId?.split(':')[2]?.toLowerCase();
      const stationName = stationFromDmaAppConfig || stationFromGlobalId;

      if (!stationName) {
        throw new Error('No station name was found!');
      }

      const { data: stationAppConfig } = await axios
        .get<AppConfig>(`stations/${stationName}/appConfig.json`)
        .catch(() => {
          throw new Error(`Could not read appConfig for ${stationName} station.`);
        });

      const payload: AppConfig = {
        ...stationAppConfig,
        dma: dmaAppConfig,
        stationName,
      };

      return payload;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);
