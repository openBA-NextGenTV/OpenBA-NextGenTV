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

interface DmaAppConfig {
  fipsToZip: Record<string, Array<string>>;
  stations: Record<string, string>;
}

interface Endpoints {
  feedProviderUrl?: string;
  latestweathercastUrl?: string;
  radioProviderUrl?: string;
  sevenDayForecastUrl?: string;
}

interface FeatureFlags {
  disableAlerts?: boolean;
  preferAEATMessages?: boolean;
  preferAEATMessagesDemo?: boolean;
  sponsorBanner?: boolean;
}

interface ConfigurationParams {
  fetchNrtInterval: number;
}

interface AppConfig {
  configurationParams: ConfigurationParams;
  dma: DmaAppConfig;
  endpoints: Endpoints;
  featureFlags: FeatureFlags;
  privacyPolicy: string;
  stationName: string;
  termAndConditions: string;
  feedId?: string;
  googleAnalyticAccount?: string;
}

export type { DmaAppConfig, Endpoints, FeatureFlags, ConfigurationParams, AppConfig };
