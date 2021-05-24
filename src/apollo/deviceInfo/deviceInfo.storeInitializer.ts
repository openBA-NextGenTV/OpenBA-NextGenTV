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

import { ApolloClient, gql } from '@apollo/client';

import { queryDeviceInfo, queryService } from '../../hooks';
import { DeviceInfo, GetDeviceInfoDocument } from '../generated/graphql';
import { DEVICE_ID } from '../localStoreKeys';
import { createDeviceInfo } from '../typeFactory';

export const initDeviceInfoStore = async (client: ApolloClient<any>) => {
  const service = await queryService();
  const { deviceMake } = await queryDeviceInfo();

  const appVersionResult = await fetch('./app-version.json', { cache: 'no-cache' });
  const { buildVersion, appVersion } = await appVersionResult.json();

  const serviceId = service?.service;
  const station = service?.service?.split(':')[2].toLowerCase();

  const deviceInfo: DeviceInfo = createDeviceInfo({
    id: '1',
    serviceId,
    station,
    isInternetConnected: window.navigator.onLine,
    deviceId: getDeviceId(),
    buildVersion,
    appVersion,
    deviceMake,
  });

  client.writeQuery({ query: GetDeviceInfoDocument, data: { deviceInfo } });

  watchCheckInternetConnection(client);
};

const watchCheckInternetConnection = (client: ApolloClient<any>) => {
  const saveIsInternetConnected = (isInternetConnected: boolean) => {
    client.writeFragment({
      id: 'DeviceInfo:1',
      fragment: gql`
        fragment deviceInfo on DeviceInfo {
          isInternetConnected
        }
      `,
      data: {
        isInternetConnected,
      },
    });
  };

  window.addEventListener('online', () => saveIsInternetConnected(true));
  window.addEventListener('offline', () => saveIsInternetConnected(false));
};

const getDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_ID);

  if (!deviceId) {
    deviceId = `YML-${Date.now().toString(32).split('').reverse().join('')}-${Math.floor(6969 * Math.random() + 1e3)}`;

    localStorage.setItem(DEVICE_ID, deviceId);
  }

  return deviceId;
};
