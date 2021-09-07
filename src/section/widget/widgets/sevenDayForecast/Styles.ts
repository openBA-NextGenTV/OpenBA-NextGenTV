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

import styled from 'styled-components';

import { breakpoints } from '../../../../utils';
import { weatherIcons } from './weatherIcons';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  width: 100%;
  ${weatherIcons}
`;

export const ContainerMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  font-size: 22px;
  margin: 0 auto;
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  color: white;
  background-color: #3274b9;
`;

export const HeaderTemp = styled.div`
  font-size: 56px;
  line-height: 50px;
  margin-right: 26px;
`;

export const HeaderIcon = styled.img`
  width: 44px;
  margin-right: 26px;
`;

export const HeaderIconCode = styled.i`
  font-size: 40px;
  margin: -10px 26px 0 0;
`;

export const HeaderTitle = styled.p`
  font-size: 20px;
`;

export const HeaderLocation = styled.p`
  font-size: 36px;
  margin-left: auto;
  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 28px;
  }
`;

export const WeatherDays = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 5px;
  overflow-y: auto;
  width: 100%;

  & > div:first-child > div:first-child {
    background-color: green;
  }

  @media (max-width: ${breakpoints.desktopWide}px) {
    & > div {
      width: calc(25% - 10px);
      max-width: calc(25% - 10px);
    }
  }
  @media (max-width: ${breakpoints.desktopLarge}px) {
    & > div {
      width: calc(50% - 15px);
      max-width: calc(50% - 15px);
    }
  }
  @media (max-width: ${breakpoints.desktopMiddle}px) {
    & > div {
      width: calc(100% - 20px);
      max-width: calc(100% - 20px);
    }
  }
`;
