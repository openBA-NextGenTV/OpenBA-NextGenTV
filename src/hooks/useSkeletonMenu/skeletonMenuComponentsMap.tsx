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

import { ReactElement } from 'react';
import { RADIO_LIST } from 'configs/ineractiveGroupViewId';
import { FAQ } from 'pages/learnMore/components';
import { Feeds } from 'pages/menu/components/feeds';
import StationList, { StreamType } from 'pages/radio/components/StationList';
import { SettingsComponent } from 'pages/settings/components/settingsComponent';
import { VodList } from 'pages/vod/components/vodList';
import DailyForecastWidget from 'pages/weather/widgets/DailyForecast/DailyForecast';
import { FeedCategory } from 'types/Feed';
import { Controls } from 'components/skeleton/components/leftMenu/components/controls';
import { MenuItemSelected } from 'components/skeleton/components/leftMenu/components/selectedMenu';
import { SixDayForecast } from 'components/weather/fullForecast/SixDayForecast';
import { BottomElement, ControlsElement, WidgetElement } from './skeletonMenuEnums';

export type SkeletonMenuElement = WidgetElement | ControlsElement | BottomElement;

const vodListMap = {
  vodTopStories: <VodList categoryID={FeedCategory.TopStories} />,
  vodLocalNews: <VodList categoryID={FeedCategory.LocalNews} />,
  vodNationWorld: <VodList categoryID={FeedCategory.NationWorld} />,
  vodSports: <VodList categoryID={FeedCategory.Sports} />,
  vodEntertainment: <VodList categoryID={FeedCategory.Entertainment} />,
  vodWeather: <VodList categoryID={FeedCategory.Weather} />,
  localRadio: <StationList viewId={RADIO_LIST} type={StreamType.Audio} category="Radio" />,
};

const selectedMenuMap = {
  selectedMenuWeather: <MenuItemSelected icon="weather" text="Weather" />,
  selectedMenuSettings: <MenuItemSelected icon="settings" text="Settings" />,
  selectedMenuFaq: <MenuItemSelected icon="faq" text="Learn More" />,
};

export const skeletonMenuComponentsMap: { [k in SkeletonMenuElement]: ReactElement } = {
  ...vodListMap,
  ...selectedMenuMap,
  learnMore: <FAQ />,
  settings: <SettingsComponent />,
  dailyForecast: <DailyForecastWidget />,
  feeds: <Feeds />,
  sixDayForecast: <SixDayForecast />,
  controls: <Controls />,
};
