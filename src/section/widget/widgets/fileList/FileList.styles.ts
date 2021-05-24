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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => theme.menu.backgroundColor};
  border-left: 1px dashed ${({ theme }) => theme.menu.borderColor};

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 10px;
  }
`;

export const ScrollContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
`;

export const Title = styled.p`
  width: 100%;
  color: white;
  margin-bottom: 20px;
  font-size: 16px;
  word-break: break-word;

  @media (max-width: ${breakpoints.desktop}px) {
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  background-color: #1e87e8;
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
