/*
 * Copyright © 2022 Sinclair Broadcast Group
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import styled from 'styled-components';
import { convertPxToVh, minFixedSize, minSize } from 'styles/responsive.mixins';

interface Props {
  mb?: number;
  mt?: number;
}

export const FlexRow = styled.div<Props>`
  display: flex;
  flex-direction: row;
  ${(props) =>
    `
    margin-bottom: ${convertPxToVh(props.mb || 0)};
    `}
`;

export const FlexRowCenter = styled(FlexRow)`
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateName = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 20px;
  line-height: 37px;
  text-align: center;
  text-transform: uppercase;
  color: #fcfcfc;
  text-shadow: -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.75);
`;

export const Temp = styled.span`
  display: flex;
  flex-direction: row;
  color: #fff;
  font-weight: bold;
  ${minSize('font-size', '5vw', '8vh')};
  line-height: 1.2;
`;

export const Broadcast = styled.p<Props>`
  color: #fff;
  font-weight: normal;
  ${minSize('font-size', '2vw', '3vh')};
  ${minFixedSize('font-size', 8)};
  line-height: 1;
  text-align: center;
  letter-spacing: 0.1vw;
  ${(props) =>
    `
    margin-bottom: ${convertPxToVh(props.mb || 0)};
    `}
`;

export const HiTemp = styled.span`
  font-weight: bold;
  line-height: 1;
  ${minSize('font-size', '2vw', '4vh')};
  ${minFixedSize('font-size', 10)};
  color: #fff;
  text-shadow: -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.75);
`;

export const LowTemp = styled(HiTemp)`
  font-weight: normal;
`;

export const InfoName = styled.span`
  line-height: 1.1;
  ${minSize('font-size', '1vw', '2vh')};
  ${minFixedSize('font-size', 6)};
  font-weight: bold;
  color: #fff;
  text-align: right;
  padding-right: 10px;
`;

export const InfoValue = styled(InfoName)`
  font-weight: normal;
  letter-spacing: 1px;
  text-align: left;
  padding-right: 0;
`;
