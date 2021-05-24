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

import objectHash from 'object-hash';
import { Alert, DeviceMake } from 'src/apollo/generated/graphql';

import { createAlert } from '../../typeFactory';
import { loader } from './loader';

export const watchNRTAlerts = (
  handleNewAlerts: (alerts: Alert[]) => void,
  deviceMake: DeviceMake = DeviceMake.Default,
) => {
  const doFetch = async () => {
    const alerts = await loader(deviceMake === DeviceMake.Lg ? '../Alert.pkg/' : '');

    const alertsHash = objectHash(alerts);

    // pass only changed and real data
    // null and not changed should not be written
    if (lastLoadedAlertsHash && lastLoadedAlertsHash === alertsHash) {
      return;
    }

    lastLoadedAlertsHash = alertsHash;
    handleNewAlerts(alerts.map(alert => createAlert(alert)));
  };

  setInterval(async () => {
    await doFetch();
  }, 5000);

  doFetch();
};

let lastLoadedAlertsHash: string;
