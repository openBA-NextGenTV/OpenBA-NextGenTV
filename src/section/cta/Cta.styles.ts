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

export const Container = styled.div`
  position: absolute;
  height: 100%;
  left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: -1;

  @media (max-width: ${breakpoints.desktop}px) {
    left: 20px;
  }
`;

export const PlaceholderWrapper = styled.div`
  width: 340px;
  .active-button {
    fill: ${props => props.theme.cta.activeButtonColor};
  }
  .passive-button {
    fill: ${props => props.theme.cta.passiveButtonColor};
    stroke: ${props => props.theme.cta.borderColor};
  }
  .background {
    fill: ${props => props.theme.cta.backgroundColor};
    stroke: ${props => props.theme.cta.borderColor};
  }
  .inscription {
    fill: ${props => props.theme.cta.textColor};
  }

  @media (max-width: ${breakpoints.desktop}px) {
    width: 280px;
  }
`;

export const LogoWrapper = styled.div`
  width: 122px;
  height: 90px;
  position: absolute;
  left: 168px;
  padding-bottom: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${breakpoints.desktop}px) {
    left: 136px;
    width: 102px;
    padding-bottom: 14px;
  }
`;

export const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
