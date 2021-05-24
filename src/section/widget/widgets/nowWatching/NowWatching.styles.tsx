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
  display: flex;
  background: black;
  color: white;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const Title = styled.p`
  text-align: center;
  font-size: 22px;
  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 14px;
  }
`;
