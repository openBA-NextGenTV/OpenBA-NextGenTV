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

import { useGetNowWatchingQuery } from '../../../../../apollo/generated/graphql';
import { useDeviceInfoModel } from '../../../../../state';

export const useNowWatching = () => {
  const { data } = useGetNowWatchingQuery();
  const { station } = useDeviceInfoModel();

  const stationLogoUrl = station ? `stations/${station}/logo.png` : null;
  const menuIsVisible = data?.menuIsVisible;
  const widget = data?.widget;

  if (!menuIsVisible) {
    return { isFullScreen: true };
  }

  if (!widget) {
    return { imageUrl: stationLogoUrl, isFullScreen: false };
  }

  if (widget.type === 'latestWeathercast') {
    return { title: 'Latest Weathercast', isFullScreen: false };
  }

  const widgetPayload = JSON.parse(widget.payload || '{}') as { title: string; imageUrl: string };
  const { title, imageUrl } =
    widgetPayload.title || widgetPayload.imageUrl ? widgetPayload : { imageUrl: stationLogoUrl, title: null };
  return { title, imageUrl, isFullScreen: false };
};
