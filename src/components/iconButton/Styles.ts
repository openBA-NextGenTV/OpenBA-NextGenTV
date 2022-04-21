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
import { convertPxToVh, convertPxToVw, minSize } from 'styles/responsive.mixins';

const IconContainer = styled.button<{ size: number; transparent?: boolean }>`
  padding: 0;
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 0;
  min-height: 16px;
  min-width: 16px;
  ${({ size, transparent }) => `
  ${minSize('width', `${convertPxToVw(size)}`, `${convertPxToVh(size)}`)};
  ${minSize('height', `${convertPxToVw(size)}`, `${convertPxToVh(size)}`)};
  ${transparent && 'background: none !important'}
  `}
`;

export const IconButtonImg = styled.img<{ width: number | undefined }>`
  ${({ width }) => `
  width: ${width || '70%'};
  height: ${width ? 'auto' : '70%'};
  `}
`;

export const IconDefaultContainer = styled(IconContainer)`
  ${minSize('border', '0.1vw', '0.2vh', 'solid #ffffff')};
  background: radial-gradient(60.67% 60.67% at 50% 18%, #2f4b8e 0%, #122743 100%) 35%;
`;

export const IconHoverContainer = styled(IconContainer)`
  border: 1px solid #ffffff;
  background: radial-gradient(91.46% 91.46% at 50% 4.88%, #5c75b1 0%, #4761a1 55.32%, #122743 100%);
`;

export const IconSelectedContainer = styled(IconContainer)`
  border: 1px solid #ffffff;
  box-shadow: inset -5.81081px 6.97297px 9.2973px rgba(0, 0, 0, 0.62);
  background: radial-gradient(91.46% 91.46% at 50% 4.88%, #4761a1 36.46%, #5c75b1 74.48%);
`;

export const IconDisabledContainer = styled(IconContainer)`
  border: 1px solid #ffffff;
  background: linear-gradient(180deg, #b3b3b3 0%, #e6e6e6 100%);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ButtonLabel = styled.span<{ fontSize?: number }>`
  margin-top: 0.7vh;
  font-weight: 700;
  ${minSize('font-size', '1.4vw', '2.5vh')};
  color: white;
  text-align: center;
  text-transform: uppercase;
  text-shadow: -0.6px -0.6px 0.5px rgba(0, 0, 0, 0.75);
`;
