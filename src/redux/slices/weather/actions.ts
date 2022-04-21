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
import { appConfigSelectors } from 'redux/slices/appConfig';
import { deviceSelectors } from 'redux/slices/device';
import { RootState } from 'redux/store';

export const fetchSevenDayForecast = createAsyncThunk(
  'weather/fetchSevenDayForecast',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const station = appConfigSelectors.getStationName(state);
    const isInternetConnected = deviceSelectors.getNetworkStatus(state);
    const ottUrl = appConfigSelectors.getSevenDayForecastUrl(state);
    const otaUrl = `dynamic/weather/7day/weather-7day-${station}.json`;
    const url = isInternetConnected ? ottUrl : otaUrl;

    try {
      if (url) {
        const sevenDayForecast = await axios.get(url);

        if (sevenDayForecast.status !== 200) throw new Error('7Day forecast fetching failed!');

        return sevenDayForecast.data;
      }

      throw new Error(`7Day forecast URL wasn't found`);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchLatestWeathercast = createAsyncThunk(
  'weather/fetchLatestWeathercast',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const isInternetConnected = deviceSelectors.getNetworkStatus(state);
    const ottUrl = appConfigSelectors.getLatestWeathercastUrl(state);
    const otaUrl = 'dynamic/weather/latest/weather-latest.mp4';
    const url = isInternetConnected ? ottUrl : otaUrl;

    try {
      if (url) {
        let data;

        const latestWeathercast = await axios.get(url, {
          headers: { 'Cache-Control': 'no-cache' },
        });

        if (latestWeathercast.status !== 200) throw new Error('Latest weathercast fetch failed!');

        if (isInternetConnected) {
          data = latestWeathercast?.data?.videoUrl ? latestWeathercast?.data : null;
        } else {
          data = {
            videoUrl: otaUrl,
          };
        }

        return data;
      }

      throw new Error(`Latest weathercast URL wasn't found`);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
