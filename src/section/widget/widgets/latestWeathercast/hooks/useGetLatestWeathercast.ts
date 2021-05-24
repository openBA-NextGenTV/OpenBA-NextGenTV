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

import { useGetAppConfigQuery } from '../../../../../apollo/generated/graphql';
import { DeviceMake } from '../../../../../apollo/generated/graphql';
import { useDeviceInfoModel } from '../../../../../state';
import { checkUntilSuccess } from '../../../../../utils';

type ResultData = {
  url: string;
  categoryOfVideo: string;
  title: string;
};

export const useGetLatestWeathercast = () => {
  const { isInternetConnected, deviceMake } = useDeviceInfoModel();
  const { data: appConfigData } = useGetAppConfigQuery();
  const latestweathercastUrl = appConfigData?.appConfig.endpoints.latestweathercastUrl;

  const [data, setData] = useState<ResultData | undefined>();
  const [loading, setLoading] = useState<boolean>();

  const completeData = (videoUrl: string) => {
    setData({
      url: videoUrl,
      categoryOfVideo: 'menu.weather',
      title: 'Latest Weathercast',
    });

    setLoading(false);
  };

  useEffect(() => {
    if (isInternetConnected) {
      if (latestweathercastUrl) {
        fetch(latestweathercastUrl)
          .then(value => value.json())
          .then(value => completeData(value.videoUrl));
      }
    } else {
      const url =
        deviceMake === DeviceMake.Lg
          ? `../weather-7day.pkg/dynamic/weather/latest/weather-latest.mp4`
          : `dynamic/weather/latest/weather-latest.mp4`;

      checkUntilSuccess(url).then(() => completeData(url));
    }
  }, [isInternetConnected, latestweathercastUrl, deviceMake]);

  return {
    data,
    loading,
  };
};
