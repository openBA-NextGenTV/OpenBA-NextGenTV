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

import styled, { css } from 'styled-components';

const InfoContainer = styled.div<{ horizontal?: boolean }>`
  display: flex;
  align-items: center;
  margin-right: 10px;
  ${({ horizontal }) =>
    !horizontal &&
    css`
      flex-direction: column;
    `}
`;

const InfoTitle = styled.span<{ horizontal?: boolean }>`
  line-height: 22px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  ${({ horizontal }) => horizontal && 'padding-right: 10px;'}
`;

const InfoValue = styled(InfoTitle)`
  font-weight: normal;
  letter-spacing: 1px;
  text-align: left;
  padding-right: 0;
  text-shadow: -0.6px -0.6px 0.5px rgba(0, 0, 0, 0.75);
`;

export { InfoContainer, InfoTitle, InfoValue };
