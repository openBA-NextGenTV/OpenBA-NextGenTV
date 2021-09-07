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
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TitleWrapper = styled.div<{ bgColor: string }>`
  position: relative;
  background-color: ${({ bgColor }) => bgColor};
  padding: 20px 0;

  @media (max-width: ${breakpoints.desktop}px) {
    padding: 10px 0;
  }
`;

export const Title = styled.p`
  padding-left: 80px;
  color: white;
  font-size: 48px;
  text-align: center;

  @media (max-width: ${breakpoints.desktop}px) {
    padding-left: 40px;
    font-size: 26px;
    word-break: break-word;
  }
`;

export const PageTitle = styled.p`
  font-size: 36px;
  color: white;
  text-align: center;
  margin: 20px;

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 24px;
    margin: 10px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 0 30px;
  height: 50%;

  @media (max-width: ${breakpoints.desktop}px) {
    flex-direction: column;
    margin: 0 10px;
  }
`;

export const ContentItem = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;

  @media (max-width: ${breakpoints.desktop}px) {
    max-height: 50%;
  }
`;

export const Description = styled.p`
  width: 80%;
  font-size: 36px;
  color: white;
  overflow-y: auto;

  @media (max-width: ${breakpoints.desktop}px) {
    font-size: 18px;
    width: 100%;
    padding: 10px 0;
  }
`;
