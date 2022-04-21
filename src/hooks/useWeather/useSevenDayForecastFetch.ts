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

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'hooks/useInterval';
import { appConfigSelectors } from 'redux/slices/appConfig';
import { weatherActions, weatherSelectors } from 'redux/slices/weather';
import { CustomDay, Day } from 'types/Weather';

export const useSevenDayForecastFetch = () => {
  const dispatch = useDispatch();
  const appConfigLoaded = useSelector(appConfigSelectors.getAppConfigLoaded);
  const sevenDayForecastLoading = useSelector(weatherSelectors.getSevenDayForecastLoading);
  const sixDayForecast = useSelector(weatherSelectors.getSixDayForecast);
  const currentDayForecast = useSelector(weatherSelectors.getCurrentDayForecast);
  const [currentDayNum, setCurrentDayNum] = useState(new Date().getDate());

  useEffect(() => {
    if (appConfigLoaded) dispatch(weatherActions.fetchSevenDayForecast());
  }, [dispatch, appConfigLoaded, currentDayNum]);

  useInterval(() => {
    setCurrentDayNum(new Date().getDate());
  }, 1000);

  useInterval(() => {
    dispatch(weatherActions.fetchSevenDayForecast());
  }, 600000);

  if (sevenDayForecastLoading)
    return { days: [] as Day[], currentDay: {} as CustomDay, sevenDayForecastLoading };

  return {
    days: sixDayForecast,
    currentDay: currentDayForecast,
    sevenDayForecastLoading,
  };
};
