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

import { AppConfig, DeviceInfo, GetAppConfigDocument } from '../generated/graphql';
import { createAppConfig } from '../typeFactory';
import { DmaAppConfig } from './appConfig.types';

export const initAppConfigStore = async (client: ApolloClient<any>) => {
  const deviceInfo = client.readFragment<Pick<DeviceInfo, 'station'>>({
    id: 'DeviceInfo:1',
    fragment: gql`
      fragment readStation on DeviceInfo {
        station
      }
    `,
  });

  if (!deviceInfo) {
    return;
  }

  const { station } = deviceInfo;

  const [stationAppConfig, dmaAppConfig] = await Promise.all([
    fetch(`stations/${station}/appConfig.json`, { cache: 'no-cache' })
      .then(value => value.json())
      .catch(() =>
        console.error(
          `Could not read appConfig for ${station} station. The json file is missing at location stations/${station}/appConfig.json`,
        ),
      ),
    fetch(`stations/appConfig.json`, { cache: 'no-cache' })
      .then(value => value.json() as Promise<DmaAppConfig>)
      .catch(() =>
        console.error(
          `Could not read DMA appConfig for ${station} station. The json file is missing at location stations/appConfig.json`,
        ),
      ),
  ]);

  if (!stationAppConfig || !dmaAppConfig) {
    return;
  }

  const appConfig: AppConfig = createAppConfig(stationAppConfig, dmaAppConfig);

  client.writeQuery({ query: GetAppConfigDocument, data: { appConfig } });
};
