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
import { queryDeviceInfo, queryResourcesPath, queryService } from 'services/websocket/websocket';
import { getDeviceId } from 'utils/device';

export const fetchDeviceInfo = createAsyncThunk(
  'device/fetchDeviceInfo',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue }) => {
    try {
      const station = await queryService();
      const deviceInfo = await queryDeviceInfo();
      const { baseURI } = await queryResourcesPath();
      const appVersionResult = await axios.get('./app-version.json');

      if (
        Object.keys(station).length === 0 ||
        Object.keys(deviceInfo).length === 0 ||
        appVersionResult.status !== 200
      ) {
        throw new Error('Data is unavailable');
      }

      return {
        baseURI,
        ...deviceInfo,
        ...station,
        ...appVersionResult.data,
        isInternetConnected: window.navigator.onLine,
        deviceId: deviceInfo?.deviceId || getDeviceId(),
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
