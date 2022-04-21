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

const menuItemHeight = 180;
const menuItemMarginBottom = 50;

export const AlertItemWrapper = styled.div<{ selected: boolean }>`
  margin-bottom: ${menuItemMarginBottom}px;
  flex-shrink: 0;
  width: 320px;
  height: ${menuItemHeight}px;
  box-sizing: content-box;
  border: ${(props) => (props.selected ? 6 : 2)}px solid #fff;
  box-shadow: inset -3px 3px 7px rgba(0, 0, 0, 0.55);
  border-radius: 20px;
  position: relative;
  background-color: ${({ color }) => color};
  background-image: linear-gradient(0deg, transparent, rgba(0, 0, 0, 0.75));
  transition: all 0.5s ease-out;
  overflow: hidden;
  zoom: ${(props) => (props.selected ? 1.13 : 1)};
  &:after {
    content: '';
    display: ${(props) => (props.selected ? 'block' : 'none')};
    background: #fff;
    opacity: 0.7;
    height: 4px;
    width: 80%;
    left: 10%;
    right: 10%;
    bottom: 20px;
    position: absolute;
  }
`;

export const AlertItemContent = styled.div`
  color: #fff;
  text-align: left;
  font-size: 24px;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 27px;
  box-sizing: border-box;
  padding: 16px 53px 18px 34px;
  font-weight: bold;
  border-radius: 20px;
  height: 157px;
  width: 100%;
  transition: all 0.5s ease-out;
`;
