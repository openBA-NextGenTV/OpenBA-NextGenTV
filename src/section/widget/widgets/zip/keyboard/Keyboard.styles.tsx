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
  margin-top: 20px;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 1em;
  grid-template-areas:
    '_1 _2 _3'
    '_4 _5 _6'
    '_7 _8 _9'
    '_del _0 _ok'
    '_cancel _cancel _cancel';

  @media (max-width: ${breakpoints.desktop}px) {
    gap: 0.4em;
  }
`;

export const DigitButton = styled.button<{
  isMenuDisabled: boolean;
  selected: boolean;
  value: string;
  disabled: boolean;
}>`
  border-radius: 10px;
  justify-self: center;
  width: 70px;
  height: 70px;
  font-weight: bold;
  font-size: 24px;
  border-color: transparent;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  background-color: ${({ isMenuDisabled, selected, theme }) =>
    selected ? (isMenuDisabled ? theme.menu.disabledItemColor : theme.menu.selectedItemColor) : 'white'};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  grid-area: ${props => '_' + props.value};
  &:focus {
    outline: none;
  }

  @media (max-width: ${breakpoints.desktop}px) {
    justify-items: stretch;
    width: 42px;
    height: 42px;
    padding: 1px 2px;
  }
`;

export const DeleteButton = styled(DigitButton)`
  background-color: #f8cecc;

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 14px;
  }
`;

export const OkButton = styled(DigitButton)`
  background-color: #d5e8d4;

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 16px;
  }
`;

export const CancelButton = styled(DigitButton)`
  width: 100%;
`;
