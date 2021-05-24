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

import { DeviceInfo, DeviceMake, useGetDeviceInfoQuery } from '../../apollo/generated/graphql';

export const useDeviceInfoModel = (): DeviceInfo => {
  const { data } = useGetDeviceInfoQuery();
  const deviceInfo = data?.deviceInfo;

  return {
    id: deviceInfo?.id || '1',
    serviceId: deviceInfo?.serviceId || '',
    deviceId: deviceInfo?.deviceId || '',
    station: deviceInfo?.station || '',
    isInternetConnected: deviceInfo?.isInternetConnected || false,
    buildVersion: data?.deviceInfo?.buildVersion || '-',
    appVersion: data?.deviceInfo?.appVersion || '-',
    deviceMake: data?.deviceInfo?.deviceMake === 'LG' ? DeviceMake.Lg : DeviceMake.Default,
  };
};
