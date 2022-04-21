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
import { minSize } from 'styles/responsive.mixins';

export const MenuItemContent = styled.div<{ selected?: boolean }>`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${minSize('padding-top', '1vw', '1.8vh')};
  ${minSize('padding-right', '1.3vw', '2.4vh')};
  ${minSize('padding-left', '1.3vw', '2.4vh')};
  ${minSize('padding-bottom', '1.4vw', '2.5vh')}
  font-weight: 700;
  ${minSize('font-size', '1.4vw', '2.5vh')}
  color: #fff;
  text-transform: initial;
`;

export const Title = styled.p<{ selected?: boolean }>`
  display: -webkit-box;
  ${minSize('max-width', '14.58vw', '25.93vh')};
  font-weight: bold;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export const DurationWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Duration = styled.span<{ selected?: boolean }>`
  position: relative;
  ${minSize('font-size', '1vw', '2vh')};
  color: #ccc;

  &:after {
    content: '';
    position: absolute;
    left: calc(100% + 0.5vw);
    top: 50%;
    width: 500px;
    height: 0.37vh;
    background: #5c7fc1;
    ${minSize('border-radius', '0.5vw', '0.9vh')};
    opacity: ${({ selected }) => (selected ? 1 : 0)};
    overflow: hidden;
    transform: translateY(-50%);
  }
`;

export const BackgroundImg = styled.img`
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
