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

import { Widget } from '../../../../apollo/generated/graphql';
import { createWidget } from '../../../../apollo/typeFactory';
import { VideoPlayerWrapper } from '../nowWatching';
import { useGetLatestWeathercast } from './hooks';
import { ContainerMessage } from './LatestWeathercast.styles';

export const LatestWeathercast = () => {
  const { data, loading } = useGetLatestWeathercast();

  if (loading) {
    return <ContainerMessage>Weather will update in a moment.</ContainerMessage>;
  }

  if (!data) {
    return <ContainerMessage>Weather is not available.</ContainerMessage>;
  }

  const widget: Widget = createWidget('latestWeathercast', JSON.stringify(data), null);

  return <VideoPlayerWrapper widget={widget} />;
};
