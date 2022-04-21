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
import { RootState } from 'redux/store';
import { Alert, Media } from 'types/Alert';
import { fetchAlertsAEATThunk } from '../alerts/actions';
import { getBaseURI } from '../device/selectors';

export const fetchOTASevenDayForecast = createAsyncThunk(
  'fileList/OTASevenDayForecast',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const station = appConfigSelectors.getStationName(state);
    const baseURI = getBaseURI(state);

    const url = baseURI
      ? `${baseURI}/dynamic/weather/7day/weather-7day-${station}.json`
      : `dynamic/weather/7day/weather-7day-${station}.json`;

    try {
      const newSevenDayForecast = await axios.get(url);

      if (newSevenDayForecast.status !== 200) throw new Error('OTA 7Day forecast fetching failed!');

      return {
        data: newSevenDayForecast.data,
        url,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchOTAAlertsMedias = createAsyncThunk(
  'fileList/OTAAlertsMedias',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue }) => {
    try {
      const { alerts } = await fetchAlertsAEATThunk();

      const mediaLinks = alerts.reduce(
        (mediasList: Media[], alert: Alert) => [...mediasList, ...alert.medias],
        []
      );

      const mediaFiles = await Promise.all(
        mediaLinks.map(async (mediaLink) =>
          axios
            .get(mediaLink.url)
            .then((response) => ({
              url: response.config.url,
              contentLength: response.headers['content-length'],
            }))
            .catch(() => false)
        )
      ).then((files) => files.filter((file) => Boolean(file)));

      return mediaFiles;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
