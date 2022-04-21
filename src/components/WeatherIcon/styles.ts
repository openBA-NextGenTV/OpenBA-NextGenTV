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
import { convertPxToVh, convertPxToVw, minSize } from 'styles/responsive.mixins';

const IconFigure = styled.i<{ size?: number }>`
  ${({ size = 60 }) => minSize('font-size', `${convertPxToVw(size)}`, `${convertPxToVh(size)}`)};
  padding: 0.5vh 0 0 0.3vw;
  color: #ffffff;
  display: inline-block;
  font-family: 'weathericons', serif;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-right: 10px;

  &.wi-stk-78,
  &.wi-stk-77 {
    margin-right: 25px;
  }

  &.wi-stk-87,
  &.wi-stk-66,
  &.wi-stk-69,
  &.wi-stk-70,
  &.wi-stk-74 {
    margin-right: 20px;
  }
`;

const SecondaryIconFigure = styled.span``;

const IconImage = styled.img<{ size?: number }>`
  width: ${({ size = 60 }) => `${convertPxToVw(size)}`};
  height: ${({ size = 60 }) => `${convertPxToVh(size)}`};
`;

export { IconFigure, SecondaryIconFigure, IconImage };
