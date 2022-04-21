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

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'hooks/useInterval';
import { appConfigSelectors } from 'redux/slices/appConfig';
import { deviceSelectors } from 'redux/slices/device';
import { weatherActions, weatherSelectors } from 'redux/slices/weather';

export const useLatestWeathercastFetch = () => {
  const dispatch = useDispatch();
  const appConfigLoaded = useSelector(appConfigSelectors.getAppConfigLoaded);
  const isInternetConnected = useSelector(deviceSelectors.getNetworkStatus);
  const latestWeathercastLoading = useSelector(weatherSelectors.getLatestWeathercastLoading);
  const latestWeathercastError = useSelector(weatherSelectors.getLatestWeathercastError);
  const latestWeathercast = useSelector(weatherSelectors.getLatestWeathercast);
  const isNeedToFetchLatestWeathercast = appConfigLoaded && !latestWeathercast;

  const fetchLatestWeathercast = () => {
    if (isNeedToFetchLatestWeathercast) {
      dispatch(weatherActions.fetchLatestWeathercast());
    }
  };

  useEffect(fetchLatestWeathercast, [
    dispatch,
    isNeedToFetchLatestWeathercast,
    isInternetConnected,
  ]);

  useInterval(fetchLatestWeathercast, 600000);

  return { latestWeathercast, latestWeathercastLoading, latestWeathercastError };
};
