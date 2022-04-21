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

import { InitialState } from './reducer';

interface State {
  appConfig: InitialState;
}

export const getState = (state: State) => state.appConfig;

export const getAppConfig = (state: State) => getState(state).value;
export const getAppConfigLoaded = (state: State) => getState(state).loaded;
export const getAppConfigLoading = (state: State) => getState(state).loading;

export const getSevenDayForecastUrl = (state: State) =>
  getState(state).value?.endpoints.sevenDayForecastUrl;
export const getLatestWeathercastUrl = (state: State) =>
  getState(state).value?.endpoints.latestweathercastUrl;

export const getFeedsUrl = (state: State) => getState(state).value?.endpoints.feedProviderUrl;

export const getRadiosUrl = (state: State) => getState(state).value?.endpoints.radioProviderUrl;

export const getPreferAEATMessages = (state: State) =>
  getState(state).value?.featureFlags?.preferAEATMessages;
export const getPreferAEATMessagesDemo = (state: State) =>
  getState(state).value?.featureFlags?.preferAEATMessagesDemo;

export const getDisableAlerts = (state: State) =>
  getState(state).value?.featureFlags?.disableAlerts;

export const getAppPrivacyPolicy = (state: State) => getState(state).value?.privacyPolicy;
export const getAppTermsAndConditions = (state: State) => getState(state).value?.termAndConditions;

export const getDmaConfig = (state: State) => getState(state).value?.dma;

export const getSponsorBannerFlag = (state: State) =>
  getState(state).value?.featureFlags?.sponsorBanner;

export const getStationName = (state: State) => getState(state).value?.stationName;
export const getGetNrtInterval = (state: State) =>
  getState(state).value?.configurationParams?.fetchNrtInterval || 0;
