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

import { Menu } from '../../../../apollo/generated/graphql';
import { breakpoints } from '../../../../utils';

const TITLE_LENGTH_TO_REDUCE_FONT = 128;

export const Container = styled.button<{ selected: Menu['selected'] }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  color: white;
  border: none;
  background-color: ${({ selected, theme }) => (selected ? theme.menu.selectedItemColor : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease-out;
  &:focus {
    outline: none;
  }
  & > :not(:last-child) {
    margin-bottom: 10px;
  }

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 10px;
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  max-height: 125px;
  object-fit: contain;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleImage = styled.img`
  max-width: 130px;
  min-width: 90px;
  max-height: 60px;
  object-fit: contain;
  margin-right: 15px;

  @media (max-width: ${breakpoints.desktop}px) {
    max-width: 80px;
    min-width: 40px;
    max-height: 40px;
    margin-right: 10px;
  }
`;

export const Title = styled.p<{ contentLength: number }>`
  width: 100%;
  text-align: left;
  word-break: break-word;
  font-size: ${({ contentLength }) => (contentLength > TITLE_LENGTH_TO_REDUCE_FONT ? '18px' : '22px')};

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 14px;
  }
`;

export const SubTitle = styled.span`
  font-size: 14px;
  color: #ffffff;
`;
