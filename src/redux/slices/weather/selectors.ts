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

import { CustomDay, Day, LatestWeathercast } from 'types/Weather';
import { InitialState } from './reducer';

interface State {
  weather: InitialState;
}

const getState = (state: State) => state.weather;

export const getSevenDayForecastLoading = (state: State) =>
  getState(state).sevenDayForecast.loading;

export const getSixDayForecast = (state: State) =>
  getState(state).sevenDayForecast.value?.days.slice(1) as Day[];

export const getCurrentDayForecast = (state: State) =>
  ({
    headerTemp: getState(state).sevenDayForecast.value?.headerTemp,
    headerTitle: getState(state).sevenDayForecast.value?.headerTitle,
    hourly: getState(state).sevenDayForecast.value?.hourlyForecasts,
    ...getState(state).sevenDayForecast.value?.days.slice(0, 1)[0],
  } as CustomDay);

export const getLatestWeathercast = (state: State) =>
  getState(state).latestWeathercast.value as LatestWeathercast;

export const getLatestWeathercastLoading = (state: State) =>
  getState(state).latestWeathercast.loading;

export const getLatestWeathercastError = (state: State) => getState(state).latestWeathercast.error;
