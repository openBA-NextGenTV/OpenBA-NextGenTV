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

export const Row = styled.div`
  width: 100%;
  display: flex;

  & {
    border-bottom: 1px solid #1e87e8;
  }
`;

export const Name = styled.div`
  width: 60%;
  padding: 10px;
  color: white;
  word-break: break-word;

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 4px;
    font-size: 14px;
  }
`;

export const Size = styled(Name)`
  width: 20%;
  text-align: center;
`;

export const Date = styled(Name)`
  width: 20%;
  text-align: center;
`;
