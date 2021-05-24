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

import { breakpoints } from '../../../../../../../utils';

export const Container = styled.div`
  height: 1em;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 50px;
  margin: 50px;
  align-self: center;

  @media (max-width: ${breakpoints.desktop}px) {
    width: calc(100% - 80px);
    margin: 20px 40px;
  }
`;

export const Filler = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #1d88ff;
  border-radius: inherit;
  text-align: right;
`;

export const StateIndicator = styled.img`
  height: 3em;
  margin-top: -1em;
  margin-right: -2em;
`;
