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

import { DeviceMake } from '../../apollo/generated/graphql';
import { Client } from './lib';
import { ScalePositionOptions } from './websocket.types';

export let rpcClient: Client | undefined;

// setup client
(() => {
  if (rpcClient) {
    return;
  }

  const wsUrl = new URLSearchParams(window.location.search).get('wsURL');

  if (wsUrl) {
    rpcClient = new Client(`${wsUrl}/atscCmd`);
  }
})();

export const queryService = () => rpcClient?.call('org.atsc.query.service') as Promise<{ service: string }>;

export const queryScalePosition = (options: ScalePositionOptions) =>
  rpcClient?.call('org.atsc.scale-position', options);

export const stopRmpPlayback = () => rpcClient?.call('org.atsc.setRMPURL', { operation: 'stopRmp' });

export const resumeRmpPlayback = () => rpcClient?.call('org.atsc.setRMPURL', { operation: 'resumeService' });

export const queryDeviceInfo = () =>
  rpcClient?.call('org.atsc.query.deviceInfo') as Promise<{ deviceMake: DeviceMake }>;

export const acquireService = (globalServiceID: string) =>
  rpcClient?.call('org.atsc.acquire.service', { svcToAcquire: globalServiceID });
