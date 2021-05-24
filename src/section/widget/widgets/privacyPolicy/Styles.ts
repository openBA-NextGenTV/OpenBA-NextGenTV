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

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${props => props.theme.menu.backgroundColor};
  color: white;
  position: absolute;
  z-index: 2;

  @media (max-width: ${breakpoints.desktop}px) {
    width: 100%;
    min-width: 160px;
    padding: 20px 10px;
  }
`;

export const Title = styled.p`
  width: 100%;
  text-align: center;
  color: white;
  margin-bottom: 40px;
  font-size: 16px;
  word-break: break-word;

  @media (max-width: ${breakpoints.desktop}px) {
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

export const ScrollContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 20px;
  font-size: 22px;

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 0 10px;
    font-size: 16px;
  }

  a {
    word-break: break-word;
  }
`;

export const BottomText = styled.p`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 22px;

  @media (max-width: ${breakpoints.desktop}px) {
    margin-top: 20px;
    margin-bottom: 0;
    font-size: 16px;
  }
`;
