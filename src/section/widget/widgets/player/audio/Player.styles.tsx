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
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.menu.backgroundColor};
  border-left: ${({ theme }) => `1px dashed ${theme.menu.borderColor}`};
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.h3`
  color: white;
  font-size: 40px;
  margin: 50px 10px;
  text-align: center;

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 26px;
    margin: 20px 10px;
  }
`;

export const ImageWrapper = styled.div`
  overflow: hidden;
  height: 100%;
`;

export const Image = styled.img`
  object-fit: contain;
  padding: 10px;
  height: 100%;
  width: 100%;
`;
