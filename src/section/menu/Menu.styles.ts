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

import { breakpoints } from '../../utils';

export const Container = styled.div<{ visible?: boolean }>`
  flex-direction: row;
  background-color: ${props => props.theme.menu.backgroundColor};
  color: white;
  height: 100%;
  position: relative;

  transition: opacity 0.3s ease-out;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};

  > *:not(:last-child) {
    border-right: 1px solid ${props => props.theme.menu.borderColor};
  }

  @media (max-width: ${breakpoints.desktop}px) {
    width: 160px;
    min-width: 160px;
  }
`;
