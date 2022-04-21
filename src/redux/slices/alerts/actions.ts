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

import { createAsyncThunk } from '@reduxjs/toolkit';
import { rpcClient } from 'services/websocket';
import { QueryAlertingResponse } from 'types/RawAlert';
import { transformAEATtoAlerts } from './utils';

export const getAlertsAsync = createAsyncThunk(
  'alert/fetchAlerts',
  async (baseURI: string | null, { rejectWithValue }) => {
    const pathToNRTData = baseURI
      ? `${baseURI}/dynamic/trigger/trigger.json`
      : 'dynamic/trigger/trigger.json';

    try {
      const response = await fetch(pathToNRTData, {
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error(`Cant't get Alerts`);
      }

      const alerts = await response.json();

      return { alerts, baseURI };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchAlertsAEATThunk = async (preferAEATDemo?: boolean) => {
  const response = (await rpcClient?.call('org.atsc.query.alerting', {
    alertingTypes: ['AEAT'],
  })) as QueryAlertingResponse;

  const alerts = transformAEATtoAlerts(response.alertList, preferAEATDemo);

  return { alerts };
};

export const getAEATAsync = createAsyncThunk(
  'alert/fetchAlertsAEAT',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (preferAEATDemo: boolean | undefined, { rejectWithValue }) => {
    try {
      return await fetchAlertsAEATThunk(preferAEATDemo);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getAlertNRT = createAsyncThunk(
  'alert/getAlertNRT',
  async (payload: { alertId: string; baseURI: string | null }, { rejectWithValue }) => {
    const { alertId, baseURI } = payload;

    const nrtFilePath = baseURI
      ? `${baseURI}/dynamic/trigger/${alertId}.json`
      : `dynamic/trigger/${alertId}.json`;

    try {
      const response = await fetch(nrtFilePath, { cache: 'no-cache' });
      const nrt = await response.json();

      if (!response.ok) {
        throw new Error(`Cant't get NRT Alerts`);
      }

      return { alertId, nrt, baseURI };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
