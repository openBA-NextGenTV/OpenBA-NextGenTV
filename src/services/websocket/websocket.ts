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

import { DeviceMake, ScalePositionOptions } from 'types/websocket';
import { Client } from './lib';

const wsUrl = new URLSearchParams(window.location.search).get('wsURL') || 'ws://localhost:8889';

export const rpcClient = new Client(`${wsUrl}/atscCmd`);

export const queryService = () =>
  rpcClient?.call('org.atsc.query.service') as Promise<{ service: string }>;

export const queryResourcesPath = () =>
  rpcClient?.call('org.atsc.query.baseURI') as Promise<{ baseURI: string }>;

export const queryScalePosition = (options: ScalePositionOptions) =>
  rpcClient?.call('org.atsc.scale-position', options);

export const stopRmpPlayback = () =>
  rpcClient?.call('org.atsc.setRMPURL', { operation: 'stopRmp' });

export const resumeRmpPlayback = () =>
  rpcClient?.call('org.atsc.setRMPURL', { operation: 'resumeService' });

export const queryDeviceInfo = () =>
  rpcClient?.call('org.atsc.query.deviceInfo') as Promise<{
    deviceId: string;
    deviceMake: DeviceMake;
  }>;

export const acquireService = (globalServiceID: string) =>
  rpcClient?.call('org.atsc.acquire.service', {
    svcToAcquire: globalServiceID,
  });
