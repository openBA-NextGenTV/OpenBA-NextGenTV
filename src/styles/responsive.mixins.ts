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

export const convertPxToVh = (size: number) => `${Math.round(((size * 100) / 1080) * 10) / 10}vh`;
export const convertPxToVw = (size: number) => `${Math.round(((size * 100) / 1920) * 10) / 10}vw`;

export const minSize = (property: string, width: string, height: string, params: string = '') =>
  `
  @media (min-aspect-ratio: 16/9) {
    ${property}: ${height} ${params};
  }
  @media (max-aspect-ratio: 16/9) {
    ${property}: ${width} ${params};
  }
  `;

export const minFixedSize = (property: string, size: number) =>
  `
  @media (max-height: 420px){
    ${property}: ${size}px;
  }
  @media (max-width: 600px) {
    ${property}: ${size}px;
  }
  `;
