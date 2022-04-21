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

export const Container = styled.div<{
  isFullScreen: boolean;
  isFullScreenAllowed: boolean;
}>`
   {
    width: 100%;
    height: 100%;
    display: flex;
    top: 0;
    left: 0;
    margin: 0;

    ${({ isFullScreen, isFullScreenAllowed }) => `
    position: ${isFullScreen ? 'fixed' : 'relative'};
    z-index: ${isFullScreen ? '10' : 'initial'};
    background-color: ${isFullScreenAllowed ? 'black' : 'transparent'};
    `}
  }
`;

export const Title = styled.div<{ isFullScreen: boolean }>`
   {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 60px 90px;
    font-size: ${({ isFullScreen }) => (isFullScreen ? '36' : '20')}px;
    line-height: 1.2;
    color: white;
    background: linear-gradient(
      0,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 40.1%,
      rgba(0, 0, 0, 0.8) 84.37%
    );
  }
`;

export const Video = styled.video`
   {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
  }
`;

export const Plug = styled.div`
   {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 48px;
    text-align: center;
    color: white;
  }
`;
