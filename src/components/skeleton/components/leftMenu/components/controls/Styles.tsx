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
import { minFixedSize, minSize } from 'styles/responsive.mixins';

export const ItemContainer = styled.div<{ hover?: boolean; selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 23vw;
  padding: 1vh 3vw 1vh;
  min-width: 160px;
  color: white;
  position: relative;
  ${({ hover, selected }) => {
    if (hover)
      return 'background: linear-gradient(90deg, rgba(255, 255, 255, 0.3) 80.45%, rgba(255, 255, 255, 0.1) 100%);';
    if (selected)
      return 'background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, #FFFFFF 22.04%);';

    return '';
  }}
`;

export const MenuItemText = styled.p<{ selected?: boolean }>`
  font-weight: bold;
  margin-left: 1vw;
  ${({ selected }) => (selected ? 'color:#1C2B3F;' : '')}
  ${minSize('font-size', '1.5vw', '3vh')};
  ${minFixedSize('font-size', 10)};
`;

export const MenuItemIndicator = styled.p`
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  ${minSize('font-size', '1.3vw', '2.5vh')};
  ${minFixedSize('font-size', 10)};
  width: 2.5vw;
  height: 2.5vw;
  position: absolute;
  margin-right: 3vw;
  background: linear-gradient(335.19deg, #434a58 15.81%, #323b4e 37.53%, #161d29 84.19%);
  right: 0;
`;
