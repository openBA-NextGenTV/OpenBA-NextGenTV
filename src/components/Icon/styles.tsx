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

import styled, { css } from 'styled-components';

const cancelledStyles = css`
  &:before {
    content: '';
    position: absolute;
    top: 47px;
    left: -5px;
    transform: rotate(-45deg);
    width: 115px;
    border-top: 8px solid white;
    z-index: 1;
  }
`;

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  text-align: center;
  background-image: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75));
  background-color: ${({ color }) => color};
  border-radius: 50%;
  border: 7px solid #ffffff;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.1);
  position: relative;

  svg {
    width: 80%;
    height: 80%;
  }

  ${({ isCanceled }: { isCanceled?: boolean }) => isCanceled && cancelledStyles}
`;

export { IconWrapper };
