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

import { breakpoints } from '../../../../../utils';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.menu.backgroundColor};
  color: white;
  min-width: 300px;
  height: 100%;
  overflow-y: auto;
  position: relative;
  -ms-overflow-style: none; // hide scroll for IE
  scrollbar-width: none; // hide scroll for firefox
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.desktop}px) {
    width: 160px;
    min-width: 160px;
  }
`;

export const Wrapper = styled.div`
  padding: 20px;
  border-right: 1px solid #9d9d9d;

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 10px;
  }
`;
