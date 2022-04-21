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

const barHeight = '5px';
const barHeightFullScreen = '8px';
const barBorderRadius = '5px';
const thumbSize = '15px';
const thumbSizeFullScreen = '25px';

const bgGradient =
  'linear-gradient(110.63deg, #395FA6 17.91%, #5487E3 29.33%, #284885 50.65%, #4368AA 92.83%)';

const fillerGradient = 'radial-gradient(114.69% 64.78% at 50% 50%, #FCFCFC 0%, #C4C4C4 78.65%)';
const thumbGradient = 'radial-gradient(114.69% 64.78% at 50% 50%, #FCFCFC 0%, #C4C4C4 78.65%)';

export const Bar = styled.div<{ isFullScreen: boolean; progress: number }>`
  position: relative;
  margin-top: 62px;
  background: ${bgGradient};
  border-radius: ${barBorderRadius};

  ${({ isFullScreen }) => `
  height: ${isFullScreen ? barHeightFullScreen : barHeight};
  margin-bottom: ${isFullScreen ? '14px' : '9px'};
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ progress }) => progress}%;
    height: 100%;
    background: ${fillerGradient};
    border-radius: ${barBorderRadius};
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    background: ${thumbGradient};
    border-radius: 50%;
    transform: translate(-50%, -50%);

    ${({ progress, isFullScreen }) => `
    left: ${progress}%;
    width: ${isFullScreen ? thumbSizeFullScreen : thumbSize};
    height: ${isFullScreen ? thumbSizeFullScreen : thumbSize};
    `}
  }
`;

export const Times = styled.div<{ isFullScreen: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: ${({ isFullScreen }) => (isFullScreen ? '36px' : '20px')};
  color: white;
  letter-spacing: -0.02em;
  text-shadow: -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.75);
`;
