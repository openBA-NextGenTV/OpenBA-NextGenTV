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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #6595ca;
  border-radius: 6px;
  color: white;
  margin: 5px;
  overflow: hidden;
  flex: 1 1 170px;
  flex-basis: auto;
  width: 0;
`;

export const Date = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #3274b9;
  text-align: center;
  color: white;
`;

export const WeekDay = styled.div`
  padding-bottom: 2px;
`;

export const MonthAndDay = styled.div`
  font-size: 12px;
  white-space: nowrap;
`;

export const Image = styled.i`
  margin: 20px;
  font-size: 40px;
`;

export const SecondImage = styled.span``;

export const Title = styled.div`
  font-size: 22px;
  margin-bottom: 20px;
  color: black;
  text-align: center;
  padding: 0 10px;
  flex: 1 1 0;
  display: flex;
  align-items: center;
`;

export const Temp = styled.div`
  font-size: 42px;
  padding: 0 10px;
  margin-bottom: 20px;
  text-align: center;
`;

export const HiTemp = styled.span`
  font-size: 42px;
  padding: 0 10px;
  color: black;
`;

export const LowTemp = styled.span`
  font-size: 26px;
  color: #8e9fb1;
`;
