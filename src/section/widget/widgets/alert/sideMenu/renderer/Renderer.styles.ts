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

import { breakpoints } from '../../../../../../utils';

export const Container = styled.button<{ isDisable: boolean; selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 20px;
  width: 100%;
  color: white;
  border: none;
  background-color: ${({ isDisable, selected, theme }) =>
    selected ? (isDisable ? theme.menu.disabledItemColor : theme.menu.selectedItemColor) : 'transparent'};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  transition: all 0.2s ease-out;

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 10px;
  }

  // Arrow Back styles
  &:first-child {
    padding: 10px;

    p {
      font-size: 22px;
    }

    @media (max-width: ${breakpoints.desktop}px) {
      padding: 0;

      p {
        font-size: 14px;
      }
    }
  }
`;

export const Title = styled.span`
  font-size: 22px;

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 14px;
  }
`;
