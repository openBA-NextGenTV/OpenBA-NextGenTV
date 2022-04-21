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

const getBackground = (selected: boolean) =>
  selected
    ? 'radial-gradient(50% 37.71% at 50% 0%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(110.19deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%)'
    : 'linear-gradient(110.19deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%)';

export const Container = styled.div<{ selected?: boolean }>`
  width: 100%;
  padding: 2vh 1vw;
  margin-bottom: 1vh;
  ${minSize('border-radius', '2vw', '3vh')};
  background: ${({ selected = false }) => getBackground(selected)};
  box-shadow: inset -3px 3px 7px rgba(0, 0, 0, 0.8);
  border: 2px solid ${({ selected }) => (selected ? '#ffffff' : 'transparent')};
  transform: ${({ selected }) => (selected ? 'scale(1.05)' : 'none')};
  transition: all 0.5s ease-out;
`;

export const Title = styled.span`
  display: block;
  margin-bottom: 1vh;
  color: #ffffff;
  ${minSize('font-size', '1.25vw', '2.22vh')};
  font-weight: bold;
  text-transform: uppercase;
`;

export const Description = styled.p`
  color: #ffffff;
  ${minSize('font-size', '1vw', '2vh')};
  margin: 1vh 0;
`;

export const ZipNumber = styled.div`
  width: 7vw;
  display: flex;
  justify-content: space-evenly;
  padding: 0.5vh 0.3vw;
  margin-right: 0.4vw;
  border: 1px solid #ffffff;
  ${minSize('border-radius', '3vw', '6vh')};
  box-sizing: border-box;
  background: linear-gradient(104.2deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%);
`;

export const ZipItem = styled.input`
  color: white;
  width: 1vw;
  margin: 0.4vh 0;
  border: none;
  background: none;
  text-align: center;
  ${minSize('font-size', '1.25vw', '2.22vh')};
  line-height: 1;
  font-weight: bold;
  position: relative;
  outline: none;
  padding: 0;

  &:focus {
    color: #ffffff;
  }
`;

export const ZipNumberContainer = styled.div`
  position: relative;
`;

export const IconWrapperUp = styled.div<{ selected: boolean }>`
  display: ${({ selected }) => (selected ? 'block' : 'none')};
  position: absolute;
  left: 3px;
  top: -6px;
`;

export const IconWrapperDown = styled.div<{ selected: boolean }>`
  display: ${({ selected }) => (selected ? 'block' : 'none')};
  position: absolute;
  left: 3px;
  bottom: -1px;
`;

export const ZipForm = styled.div`
  ${minSize('margin', '0.4vw', '0.8vh')};
  display: flex;
  justify-content: center;
  align-items: center;
`;
