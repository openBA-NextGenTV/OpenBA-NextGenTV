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

import styled, { keyframes } from 'styled-components';
import { convertPxToVw, minSize } from 'styles/responsive.mixins';
import { Description as zipDescription } from 'components/settings/components/zipCode/Styles';

const changeColor = (position: number) => keyframes` {
    from { 
      color:rgba(${position},0,0,0.000${position});
        }
    to   {  color: #1C2B3F;}
  }`;

export const Wrapper = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  margin: 0 0 auto 0;
`;
export const OptionsContainer = styled.div`
  width: 10.7vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5) 4px,
    grey 5px,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  );
  position: relative;
  margin: 0 0.52vw;
`;
export const Option = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(180deg, #c4c4c4 0%, #686868 100%);
  border: 1px solid #ffffff;
  box-sizing: border-box;
`;

export const SelectedOption = styled.div<{ position: number }>`
  position: absolute;
  ${({ position }) =>
    minSize('left', convertPxToVw(position * 39 - 10), convertPxToVw(position * 39 - 10))};
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background: #809dd3;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 31px;
  text-align: center;
  text-transform: uppercase;
  color: #1c2b3f;
  transition: left 0.5s ease-out;
  animation: ${({ position }) => changeColor(position)} 0.5s linear;
`;

export const Description = styled(zipDescription)`
  min-height: 8vh;
`;
