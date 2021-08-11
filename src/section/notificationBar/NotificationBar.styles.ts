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

export const Container = styled.div<{ variant: string }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px 0 80px;
  background-color: ${({ variant }) => variant};
  color: white;
  position: relative;
  z-index: 2;

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 0 0 0 40px;
  }
`;

export const Icon = styled.div<{ iconPath: string }>`
  background-image: url('${({ iconPath }) => iconPath}');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 60px;
  height: 100%;
  position: absolute;
  left: 10px;
  top: 0;

  @media (max-width: ${breakpoints.desktop}px) {
    width: 30px;
    left: 5px;
  }
`;

export const Text = styled.div`
  font-size: 48px;
  white-space: pre;
  margin: 6px 0;

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 20px;
  }
`;

export const TextContainer = styled.div`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
`;

export const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;

  > :first-child {
    margin-left: 30px;
  }

  @media (max-width: ${breakpoints.desktop}px) {
    > :first-child {
      margin-left: 6px;
    }
  }
`;

export const Button = styled.button<{ selected?: boolean }>`
  font-size: 16px;
  width: max-content;
  margin: 0 10px;
  padding: 5px 10px;
  border: 2px solid #ffffff;
  border-radius: 8px;
  background-color: transparent;
  outline: none;
  color: #ffffff;

  transition: box-shadow 0.2s ease-out;

  box-shadow: ${({ selected }) => (selected ? '0 0 2px 2px rgba(255, 255, 255, 0.8)' : 'none')};

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 14px;
    margin: 0 6px;
    padding: 3px 6px;
    border: 2px solid #ffffff;
    border-radius: 8px;
  }
`;
