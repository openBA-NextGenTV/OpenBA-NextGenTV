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
import { convertPxToVh, convertPxToVw, minFixedSize, minSize } from 'styles/responsive.mixins';

export const Container = styled.div<{ marginBottom?: number }>`
  min-width: 11vw;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  ${({ marginBottom = 5 }) =>
    minSize('grid-row-gap', `${convertPxToVw(marginBottom)}`, `${convertPxToVh(marginBottom)}`)};
`;

export const NavBarItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 6px;
`;

export const NavItemText = styled.span<{ fontSize?: number }>`
  min-width: max-content;
  margin: 0 0.2vw;
  color: #e5e5e5;
  font-weight: bold;
  text-transform: uppercase;
  ${({ fontSize = 20 }) =>
    minSize('font-size', `${convertPxToVw(fontSize)}`, `${convertPxToVh(fontSize)}`)};
  ${minFixedSize('font-size', 6)};
`;

export const NavBarContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 43px;
  padding: 5px 20px;
  border-radius: 64px;
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(62, 62, 62, 0.9) 100%);
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    ${minSize('width', '1.5vw', `3vh`)};
    ${minSize('height', '1.5vw', `3vh`)};
    ${minFixedSize('width', 6)};
    ${minFixedSize('height', 6)};
    height: auto;
  }
`;
