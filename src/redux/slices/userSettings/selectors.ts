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

import { FIPS_WILDCARD, ZIP_WILDCARD } from 'configs/wildCards';
import { InitialState as AppConfigState } from '../appConfig/reducer';
import { InitialState } from './reducer';

export interface State {
  appConfig: AppConfigState;
  userSettings: InitialState;
}

const getState = (state: State) => state.userSettings;

export const getAlertPriority = (state: State) => getState(state).value.alertPriority;

export const getZip = (state: State) => getState(state).value.zip;

export const getFips = (state: State) => {
  const dmaConfig = state.appConfig.value?.dma;
  const zipCode = getState(state).value.zip;

  if (!dmaConfig?.fipsToZip || !zipCode) {
    return undefined;
  }

  if (zipCode === ZIP_WILDCARD) {
    return `target:fips:${FIPS_WILDCARD}`;
  }

  return Object.entries(dmaConfig.fipsToZip).reduce<string | null>(
    (acc, [fips, zips]) => (zips.includes(zipCode) ? `target:fips:${fips}` : acc),
    null
  );
};
