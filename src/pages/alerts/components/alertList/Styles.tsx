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

const menuItemHeight = 219;
const menuItemMarginBottom = 22;
const numberOfItemsBeforeScrollStarts = 2;

export const Wrapper = styled.div`
  min-width: 437px;
  height: 100%;
  background: #585858 linear-gradient(180deg, rgba(32, 33, 32, 0.2) 0%, #2e2d2e 15.1%);
  box-shadow: inset 5px 3px 6px rgba(0, 0, 0, 0.55);
  position: relative;
  overflow: hidden;

  &:after {
    position: absolute;
    background: linear-gradient(to top, transparent 0%, #000 300%);
    z-index: 3;
    content: '';
    top: 0;
    right: 0;
    height: 30px;
    width: 100%;
  }
`;

const calculateTop = (props: { clientHeight: number; selected: number }) => {
  const { clientHeight, selected } = props;

  const selectedElementHeight =
    (selected + numberOfItemsBeforeScrollStarts) * (menuItemHeight + menuItemMarginBottom);

  if (!clientHeight) {
    return 0;
  }

  return selectedElementHeight > clientHeight ? selectedElementHeight - clientHeight : 1;
};

export const Container = styled.div<{
  clientHeight: number;
  selected: number;
  shouldPlayAnimation: boolean;
}>`
  top: ${calculateTop}px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  align-items: center;
  transition: all ${({ shouldPlayAnimation }) => (shouldPlayAnimation ? 0.5 : 0)}s ease-out;
`;
