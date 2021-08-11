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

import { useEffect, useState } from 'react';

import { DeviceMake, useGetAppConfigQuery } from '../../../../../apollo/generated/graphql';
import { useDeviceInfoModel } from '../../../../../state';
import { loadUntilSuccess } from '../../../../../utils';
import { ResultData } from './types';

export const useGetSevenDayForecast = () => {
  const { data: appConfigData } = useGetAppConfigQuery();
  const sevenDayForecastUrl = appConfigData?.appConfig.endpoints.sevenDayForecastUrl;

  const { station, deviceMake, isInternetConnected } = useDeviceInfoModel();

  const [data, setData] = useState<ResultData | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const completeDataHandler = (data: ResultData) => {
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isInternetConnected) {
      if (sevenDayForecastUrl) {
        fetch(sevenDayForecastUrl)
          .then(value => value.json())
          .then(value => completeDataHandler(value));
      }
    } else {
      const url =
        deviceMake === DeviceMake.Lg
          ? `../weather-7day.pkg/dynamic/weather/7day/weather-7day-${station}.json`
          : `dynamic/weather/7day/weather-7day-${station}.json`;

      loadUntilSuccess(url).then(value => completeDataHandler(value as ResultData));
    }
  }, [isInternetConnected, sevenDayForecastUrl, deviceMake, station]);

  return { data, loading };
};
