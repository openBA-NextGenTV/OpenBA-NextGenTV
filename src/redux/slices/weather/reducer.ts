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

import { createSlice } from '@reduxjs/toolkit';
import { LatestWeathercast, SevenDayForecast } from 'types/Weather';
import { fetchLatestWeathercast, fetchSevenDayForecast } from './actions';

export interface InitialState {
  latestWeathercast: {
    error: null;
    loading: boolean;
    value: LatestWeathercast | null;
  };
  sevenDayForecast: {
    error: null;
    loading: boolean;
    value: SevenDayForecast | null;
  };
}

const initialState: InitialState = {
  sevenDayForecast: {
    value: null,
    loading: false,
    error: null,
  },
  latestWeathercast: {
    value: null,
    loading: false,
    error: null,
  },
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearLatestWeatherсast: (state) => {
      state.latestWeathercast = { ...initialState.latestWeathercast };
    },
  },
  extraReducers: {
    [fetchSevenDayForecast.pending.toString()]: (state) => {
      state.sevenDayForecast.loading = true;
      state.sevenDayForecast.error = null;
    },
    [fetchSevenDayForecast.fulfilled.toString()]: (state, action) => {
      state.sevenDayForecast.loading = false;
      state.sevenDayForecast.value = action.payload as SevenDayForecast;
    },
    [fetchSevenDayForecast.rejected.toString()]: (state, action) => {
      state.sevenDayForecast.loading = false;
      state.sevenDayForecast.value = null;
      state.sevenDayForecast.error = action.payload;
    },

    [fetchLatestWeathercast.pending.toString()]: (state) => {
      state.latestWeathercast.loading = true;
      state.latestWeathercast.value = null;
      state.latestWeathercast.error = null;
    },
    [fetchLatestWeathercast.fulfilled.toString()]: (state, action) => {
      state.latestWeathercast.loading = false;
      state.latestWeathercast.value = action.payload as LatestWeathercast;
    },
    [fetchLatestWeathercast.rejected.toString()]: (state, action) => {
      state.latestWeathercast.loading = false;
      state.latestWeathercast.error = action.payload;
    },
  },
});

export default weatherSlice.reducer;

export const { actions, reducer } = weatherSlice;
