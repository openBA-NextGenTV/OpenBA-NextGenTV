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

export const Container = styled.div`
  height: 40vh;
  padding: 3vh 2.5vw 2vh;
  box-sizing: border-box;
  background: linear-gradient(246.43deg, rgba(0, 0, 0, 0.28) 7.85%, rgba(0, 0, 0, 0.32) 85.12%);
  box-shadow: inset 0px 4px 6px rgba(0, 0, 0, 0.63);
  border-radius: 1.2rem;
`;

export const Text = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  color: white;
  margin-bottom: 2vh;
  font-size: 1.7rem;
  line-height: 3vh;
  text-align: center;
  letter-spacing: -0.02em;
`;
