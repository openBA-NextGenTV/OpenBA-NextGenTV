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

import { DmaAppConfig } from '../appConfig/appConfig.types';
import { AppConfig, CtaTheme, DmaConfig, Endpoints, FeatureFlags, MenuTheme, Theme } from '../generated/graphql';
import { addType } from './utils';

export const createAppConfig = (appConfig: AppConfig, dmaAppConfig: DmaAppConfig) => {
  const result: AppConfig = {
    id: '1',
    googleAnalyticAccount: appConfig.googleAnalyticAccount || null,
    endpoints: createEndpoints(appConfig.endpoints),
    featureFlags: createFeatureFlags(appConfig.featureFlags),
    theme: createTheme(appConfig.theme),
    privacyPolicy: appConfig.privacyPolicy || '',
    dmaConfig: createDmaConfig(dmaAppConfig),
  };

  addType(result, 'AppConfig');

  return result;
};

const createEndpoints = (endpoints: Endpoints) => {
  const result: Endpoints = {
    id: '1',
    latestweathercastUrl: endpoints.latestweathercastUrl || null,
    sevenDayForecastUrl: endpoints.sevenDayForecastUrl || null,
    feedProviderUrl: endpoints.feedProviderUrl || null,
    flashChannelUrl: endpoints.flashChannelUrl || null,
    newsOnDemandUrl: endpoints.newsOnDemandUrl || null,
  };

  addType(result, 'Endpoints');

  return result;
};

const createFeatureFlags = (featureFlags?: FeatureFlags) => {
  const result: FeatureFlags = {
    id: '1',
    menuItemsDisabled: featureFlags?.menuItemsDisabled || [],
    flashChannelEnabled: featureFlags?.flashChannelEnabled || null,
    preferAEATMessages: featureFlags?.preferAEATMessages || false,
    disableAlerts: featureFlags?.disableAlerts || false,
  };

  addType(result, 'FeatureFlags');

  return result;
};

const createTheme = (theme: Theme) => {
  const result: Theme = { id: '1', menu: createMenuTheme(theme.menu), cta: createCtaTheme(theme.cta) };

  addType(result, 'Theme');

  return result;
};

const createMenuTheme = (menuTheme: MenuTheme) => {
  const result: MenuTheme = {
    id: '1',
    backgroundColor: menuTheme.backgroundColor,
    borderColor: menuTheme.borderColor,
    selectedItemColor: menuTheme.selectedItemColor,
    disabledItemColor: menuTheme.disabledItemColor,
  };

  addType(result, 'MenuTheme');

  return result;
};

const createCtaTheme = (ctaTheme: CtaTheme) => {
  const result: CtaTheme = {
    id: '1',
    backgroundColor: ctaTheme.backgroundColor,
    borderColor: ctaTheme.borderColor,
    activeButtonColor: ctaTheme.activeButtonColor,
    passiveButtonColor: ctaTheme.passiveButtonColor,
    textColor: ctaTheme.textColor,
  };

  addType(result, 'CtaTheme');

  return result;
};

const createZipToFipsMap = (dmaAppConfig: DmaAppConfig) => {
  const zipToFipsMap = [];
  for (const i in dmaAppConfig.fipsToZip) {
    const zips = dmaAppConfig.fipsToZip[i];
    for (const k of zips) {
      zipToFipsMap.push(
        addType(
          {
            id: k,
            fips: i,
          },
          'ZipToFips',
        ),
      );
    }
  }

  return zipToFipsMap;
};

const createDmaConfig = (dmaAppConfig: DmaAppConfig) => {
  const result: DmaConfig = {
    id: '1',
    zipToFipsMap: createZipToFipsMap(dmaAppConfig),
  };

  addType(result, 'DmaConfig');

  return result;
};
