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

export const MediaNavContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  background: linear-gradient(180deg, rgba(32, 32, 32, 0.85) 90.62%, rgba(47, 47, 47, 0.85) 100%);
  border: 1px solid #ffffff;
  border-radius: 47px;
  padding: 16px 14px;
`;

export const MediaNavItem = styled.div`
  margin: 0 10px;
  background: linear-gradient(0deg, #686868 0%, #c4c4c4 100%);
  border: 1px solid #ffffff;
  width: 35px;
  height: 37px;
  border-radius: 50%;
`;

export const MediaNavSelectedItem = styled(MediaNavItem)`
  background: linear-gradient(180deg, #943030 0%, #fa0000 100%);
  border: 2px solid #ffffff;
`;
