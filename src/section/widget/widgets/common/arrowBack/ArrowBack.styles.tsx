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

import { ReactComponent as IconSvg } from '../../../../../icons/arrow-left-solid.svg';
import { breakpoints } from '../../../../../utils';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const IconWrapper = styled.div<{ hideDesktopArrow?: boolean }>`
  display: none;

  @media (max-width: ${breakpoints.desktop}px) {
    display: block;
  }
`;

export const Icon = styled(IconSvg)`
  width: 14px;
  margin-right: 10px;
`;

export const TitleMobile = styled.p`
  display: none;
  font-size: 14px;
  word-break: break-word;

  @media (max-width: ${breakpoints.desktop}px) {
    display: block;
  }
`;

export const Title = styled(TitleMobile)`
  display: block;
  font-size: 16px;

  @media (max-width: ${breakpoints.desktop}px) {
    display: none;
  }
`;
