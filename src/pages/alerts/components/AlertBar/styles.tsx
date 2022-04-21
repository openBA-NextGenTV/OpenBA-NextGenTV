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

const AlertBarContainer = styled.div<{ color?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: ${({ color }) => color};
`;

const NavBarWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: center;
`;

const AlertTextMixin = css`
  content: '';
  height: 100%;
  width: 90px;
  position: absolute;
  top: 0;
`;

const AlertText = styled.div<{ color?: string; fontSize?: number }>`
  flex: 1;
  padding: 0 5px;
  font-weight: bold;
  font-size: ${({ fontSize = 80 }) => `${fontSize}px`};
  line-height: ${({ fontSize = 80 }) => `${fontSize}px`};
  text-transform: uppercase;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  &:after {
    ${AlertTextMixin}
    background: ${({ color }) => `linear-gradient(to right, transparent 0%, ${color} 100%)`};
    right: -1px;
  }
  &:before {
    ${AlertTextMixin}
    background: ${({ color }) => `linear-gradient(to left, transparent 0%, ${color} 100%)`};
    left: 0px;
    z-index: 1;
  }
`;

const StatusWrapper = styled.div`
  width: 180px;
  padding-left: 10px;
`;

export { AlertBarContainer, NavBarWrapper, AlertText, StatusWrapper };
