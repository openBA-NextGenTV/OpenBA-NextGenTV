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

import { Alert, DeviceInfo, FeatureFlags, GetAlertsDocument } from '../generated/graphql';
import { watchAEATAlerts } from './aeat/';
import { getHiddenAlertFromLocalStorage, setHiddenAlertToLocalStorage } from './alerts.fieldPolicy';
import { watchNRTAlerts } from './nrt';

export const initAlertsStore = (client: ApolloClient<any>) => {
  if (isAlertsDisabled(client)) {
    return;
  }

  const deviceInfo = readDeviceMake(client);

  client.writeQuery({
    query: GetAlertsDocument,
    data: {
      alerts: [],
    },
  });

  initHiddenAlert();

  if (isAEATAvailable(client)) {
    watchAEATAlerts((alerts: Alert[]) => putAlertsIntoStore(client, alerts));
  } else {
    watchNRTAlerts((alerts: Alert[]) => putAlertsIntoStore(client, alerts), deviceInfo?.deviceMake);
  }
};

const initHiddenAlert = () => {
  const hiddenAlert = getHiddenAlertFromLocalStorage();

  if (!hiddenAlert) {
    setHiddenAlertToLocalStorage(0);
  }
};

const putAlertsIntoStore = (client: ApolloClient<any>, alerts: Alert[]) => {
  client.writeQuery({
    query: GetAlertsDocument,
    data: {
      alerts,
    },
  });
};

const readDeviceMake = (client: ApolloClient<any>) =>
  client.readFragment<Pick<DeviceInfo, 'deviceMake'>>({
    id: 'DeviceInfo:1',
    fragment: gql`
      fragment readDeviceMake on DeviceInfo {
        deviceMake
      }
    `,
  });

const isAlertsDisabled = (client: ApolloClient<any>) => {
  const featureFlags = client.readFragment<FeatureFlags>({
    id: 'FeatureFlags:1',
    fragment: gql`
      fragment readFeatureFlags on FeatureFlags {
        disableAlerts
      }
    `,
  });

  return featureFlags?.disableAlerts || false;
};

const isAEATAvailable = (client: ApolloClient<any>) => {
  const featureFlags = client.readFragment<FeatureFlags>({
    id: 'FeatureFlags:1',
    fragment: gql`
      fragment readFeatureFlags on FeatureFlags {
        preferAEATMessages
      }
    `,
  });

  return featureFlags?.preferAEATMessages || false;
};
