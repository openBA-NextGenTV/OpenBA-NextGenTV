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

import { FC, useEffect } from 'react';
import ReactGA from 'react-ga';

import { GetWidgetQuery, Widget as WidgetModel } from '../../apollo/generated/graphql';
import { useDeviceInfoModel, useWidgetModel } from '../../state';
import {
  Alert,
  AudioPlayerWrapper,
  FileList,
  LatestWeathercast,
  Priority,
  PrivacyPolicy,
  RMPPlaceholderWrapper,
  SevenDayForecast,
  SystemInfo,
  VideoPlayerWrapper,
  Zip,
} from './widgets';
import { Radio } from './widgets/otaRadio';

export type WidgetComponentProps = {
  widget: WidgetModel;
};

export const Widget = () => {
  const { widget } = useWidgetModel();

  useTrackPage(widget);

  if (!widget) {
    return <RMPPlaceholderWrapper />;
  }

  let WidgetComponent: FC<WidgetComponentProps> | null = null;
  let needToShowRMPPlaceHolder = false;

  switch (widget.type) {
    case 'alert':
      WidgetComponent = Alert;
      break;
    case 'audioPlayer':
      WidgetComponent = AudioPlayerWrapper;
      break;
    case 'videoPlayer':
      WidgetComponent = VideoPlayerWrapper;
      break;
    case 'zip':
      WidgetComponent = Zip;
      needToShowRMPPlaceHolder = true;
      break;
    case 'priority':
      WidgetComponent = Priority;
      needToShowRMPPlaceHolder = true;
      break;
    case 'privacyPolicy':
      WidgetComponent = PrivacyPolicy;
      break;
    case 'systemInfo':
      WidgetComponent = SystemInfo;
      needToShowRMPPlaceHolder = true;
      break;
    case 'sevenDayForecast':
      WidgetComponent = SevenDayForecast;
      break;
    case 'latestWeathercast':
      WidgetComponent = LatestWeathercast;
      break;
    case 'fileList':
      WidgetComponent = FileList;
      break;
    case 'otaRadio':
      WidgetComponent = Radio;
      break;
  }

  if (!WidgetComponent) {
    return null;
  }

  return (
    <>
      <WidgetComponent widget={widget} />

      {needToShowRMPPlaceHolder && <RMPPlaceholderWrapper />}
    </>
  );
};

const useTrackPage = (widget: GetWidgetQuery['widget']) => {
  const { serviceId } = useDeviceInfoModel();

  useEffect(() => {
    if (widget && widget.metric) {
      const { page, title } = widget.metric;

      ReactGA.pageview(`${serviceId}/${page}`, undefined, title || undefined);
    }
  }, [widget, serviceId]);
};
