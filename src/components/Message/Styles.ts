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
import { minFixedSize, minSize } from 'styles/responsive.mixins';

export const Container = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  ${minSize('height', '13vw', `23vh`)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.div`
  max-width: 52vw;
  ${minSize('padding', '2vw', '3vh')};
  ${minSize('font-size', '2vw', '3vh')};
  ${minFixedSize('font-size', 8)};
  line-height: 1.22;
  letter-spacing: 0.02em;
  text-align: center;
  color: #fff;
  background: linear-gradient(180deg, rgba(32, 32, 32, 0.85) 90.62%, rgba(47, 47, 47, 0.85) 100%);
  border: 1px solid #ffffff;
  ${minSize('border-radius', '1vw', '2vh')};
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.35), inset -5px 6px 4px rgba(0, 0, 0, 0.25);
`;
