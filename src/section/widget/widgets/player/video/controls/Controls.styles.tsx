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

import styled, { keyframes } from 'styled-components';

import { breakpoints } from '../../../../../../utils';

const showControlPanelAnimation = keyframes`
 0% { bottom: -150px; opacity: 0.6; }
 100% { bottom: 0; }
`;

const hideControlPanelAnimation = keyframes`
 0% { bottom: 0; }
 100% { bottom: -150px; opacity: 0.6; }
`;

export const VideoControls = styled.div<{ hidden: boolean }>`
  height: 150px;
  background-color: ${props => props.theme.menu.backgroundColor};
  position: absolute;
  bottom: ${props => (props.hidden ? '-150px' : '0px')};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  animation-name: ${props => (props.hidden ? hideControlPanelAnimation : showControlPanelAnimation)};
  animation-duration: 1s;
  animation-iteration-count: 1;

  @media (max-width: ${breakpoints.desktop}px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const VideoControlInstruction = styled.img`
  object-fit: contain;
  margin: 1em;

  @media (max-width: ${breakpoints.desktop}px) {
    height: 80px;
    margin: 0;
  }
`;
