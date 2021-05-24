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

export const Container = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  background-color: ${({ selected, theme }) => (selected ? theme.menu.selectedItemColor : 'none')};

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 10px 0 10px 4px;
  }
`;

export const Circle = styled.div<{ selected?: boolean }>`
  min-width: 20px;
  height: 20px;
  border-radius: 25px;
  margin-right: 20px;
  border: ${({ selected }) => (selected ? 10 : 2)}px solid white;
  transition: border 0.2s ease-in-out;

  @media (max-width: ${breakpoints.desktop}px) {
    min-width: 16px;
    height: 16px;
    margin-right: 4px;
    border: ${({ selected }) => (selected ? 8 : 2)}px solid white;
  }
`;

export const Label = styled.span`
  font-size: 18px;
  word-break: break-word;

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 14px;
  }
`;
