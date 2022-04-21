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

import styled, { css, keyframes } from 'styled-components';

const listClearStyles = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const moveListUp = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -354px, 0);
  }
`;

const ListWrapper = styled.ul`
  ${listClearStyles}
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 564px;
`;

const ListItem = styled.li`
  padding: 0 40px;
  display: grid;
  grid-template-columns: 70% 15% 15%;
  align-items: center;
  height: 47px;
  background: linear-gradient(180deg, rgba(252, 252, 252, 0) 0%, rgba(159, 184, 232, 0.1) 100%);
  animation: ${moveListUp} 15s ease-in-out infinite alternate;
`;

const ItemText = styled.span`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
`;

export { ListWrapper, ListItem, ItemText };
