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

import { useRef } from 'react';

import { DeviceMake } from '../../../../apollo/generated/graphql';
import { useCommandScroll, useNrtFallbackRequest } from '../../../../hooks';
import { useDeviceInfoModel } from '../../../../state';
import { File } from './file';
import { Container, Header, Name, ScrollContainer, Status, Title } from './FileList.styles';

const VIEW_ID = 'fileList';

const fileListGeneral = [
  'dynamic/trigger/trigger.json',
  'dynamic/weather/latest/weather-latest.mp4',
  'dynamic/weather/7day/weather-7day-${station}.json',
];

const fileListLg = [
  '../Alert.pkg/dynamic/trigger/trigger.json',
  '../weather-7day.pkg/dynamic/weather/latest/weather-latest.mp4',
  '../weather-7day.pkg/dynamic/weather/7day/weather-7day-${station}.json',
];

// should be uncommented when it will be implemented on the Platform side

export const FileList = () => {
  const { station } = useDeviceInfoModel();
  const { deviceMake } = useDeviceInfoModel();

  const fileList: Array<string> = deviceMake === DeviceMake.Lg ? fileListLg : fileListGeneral;

  const files = fileList.map(file => file.replace('${station}', station));

  const { status } = useNrtFallbackRequest(files);

  const fileListRef = useRef<HTMLDivElement>(null);

  useCommandScroll(fileListRef, VIEW_ID);

  return (
    <Container>
      <Title>File List</Title>

      <Header>
        <Name>Name</Name>
        <Status>Status</Status>
      </Header>

      <ScrollContainer ref={fileListRef}>
        {status?.map(({ name, status }, index: number) => (
          <File key={index} name={name} status={status ? 'OK' : 'No file'} />
        ))}
      </ScrollContainer>
    </Container>
  );
};
