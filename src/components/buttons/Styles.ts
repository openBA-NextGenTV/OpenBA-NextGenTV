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

export const ButtonBase = styled.button`
  text-align: center;
  text-transform: uppercase;
  border-radius: 133px;
  color: white;
  padding: 0.5vh 0.6vw;
  font-weight: bold;
  ${minSize('font-size', '1.25vw', '2.22vh')};
  ${minFixedSize('font-size', 8)};
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const ButtonBlueStyled = styled(ButtonBase)`
  ${minSize('font-size', '1.25vw', '2.22vh')};
  ${minFixedSize('font-size', 8)};
  line-height: 1;
  ${minSize('border', '0.2vw', '0.3vh', 'solid #ffffff')};
  background: radial-gradient(
    92.21% 90.99% at 49.55% 6.31%,
    #4a6eb1 14.61%,
    #335391 79.52%,
    #244786 92.77%
  );
  padding: 0.5vh 1vw;
`;
