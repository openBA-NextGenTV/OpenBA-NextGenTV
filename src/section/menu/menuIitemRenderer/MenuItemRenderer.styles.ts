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

import { breakpoints } from '../../../utils';

export const Container = styled.div<{ isSelected?: boolean }>`
  width: 300px;
  height: 100%;
  max-height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  animation: slideLeft 0.3s ease-out;

  @keyframes slideLeft {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @media (max-width: ${breakpoints.desktop}px) {
    width: 160px;
    padding: 10px;
    position: absolute;
    z-index: ${({ isSelected }) => (isSelected ? 1 : 0)};
    background-color: ${props => props.theme.menu.backgroundColor};
  }
`;

export const Time = styled.p`
  font-size: 14px;
  font-weight: bold;
  text-align: right;
  color: #79d0ff;
  padding-bottom: 16px;

  @media (max-width: ${breakpoints.desktop}px) {
    display: none;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  text-align: center;

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 10px 0;
  }
`;

export const Image = styled.img`
  max-width: 100%;
`;

export const NoItemsText = styled.div`
  width: 100%;
  text-align: left;
  word-break: break-word;
  font-size: 16px;
  font-style: italic;
  padding: 20px;
  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 12px;
  }
`;

export const ItemsContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  position: relative;
  -ms-overflow-style: none; // hide scroll for IE
  scrollbar-width: none; // hide scroll for firefox
  &::-webkit-scrollbar {
    display: none;
  }
`;
