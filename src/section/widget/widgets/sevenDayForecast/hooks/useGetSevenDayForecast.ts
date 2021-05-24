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
import { isToday, loadUntilSuccess } from '../../../../../utils';
import { Day, ResultData } from './types';

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

      loadUntilSuccess(url).then(value => completeDataHandler(parseData(value)));
    }
  }, [isInternetConnected, sevenDayForecastUrl, deviceMake, station]);

  return { data, loading };
};

// temporary BA need to convert data from json.
// In the future - json will have the same structure like from adapter endpoint
const parseData = (data: any) => {
  const forecast = data?.data?.[0]?.forecast;
  const { city, state } = forecast;
  const { tempF, iconCode, skyText } = forecast?.current;

  const days: Day[] = forecast?.weatherForecasts
    .map((day: any) => ({
      dateTime: day.dateTime,
      image: day?.modifiedIconCode || day.origIconCode,
      title: day?.modifiedSkyText || day.origSkyText,
      hiTemp: day?.modifiedHiTempF || day.origHiTempF,
      lowTemp: day?.modifiedLoTempF || day.origLoTempF,
      precipitation: day?.modifiedPrecipChance || day.origPrecipChance,
      wind: day?.modifiedWindSpeedMph || day.wndSpdMph,
      windDirection: day.wndDirCardinal,
      humidity: day.relHumidity,
      ultraviolet: day?.modifiedUvDescription || day.uvDescr,
    }))
    .filter((day: Day) => day.dateTime > Date.now() || isToday(day.dateTime))
    .sort((a: Day, b: Day) => a.dateTime - b.dateTime)
    .slice(0, 7);

  return {
    city,
    state,
    headerTemp: tempF,
    headerImage: iconCode,
    headerTitle: skyText,
    days,
  } as ResultData;
};
