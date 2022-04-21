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
import { ButtonBase } from 'components/buttons';

const ButtonBaseOk = styled(ButtonBase)`
  ${minSize('width', '2.24vw', '4vh')};
  ${minSize('height', '2.24vw', '4vh')};
  ${minSize('font-size', '1vw', '2vh')};
  line-height: 1.11;
  padding: 0;
  display: flex;
  justify-content: center;
`;

export const ButtonDefaultOkStyled = styled(ButtonBaseOk)`
  border: 1px solid #fcfcfc;
  background: radial-gradient(
    92.21% 90.99% at 49.55% 6.31%,
    #4a6eb1 14.61%,
    #335391 79.52%,
    #244786 92.77%
  );
`;

export const ButtonHoverOkStyled = styled(ButtonBaseOk)`
  ${minSize('border', '0.2vw', '0.3vh', 'solid #ffffff')};
  box-shadow: 2px 3.82px 7.84px rgba(0, 0, 0, 0.45);
  background: radial-gradient(
    92.21% 90.99% at 49.55% 6.31%,
    #4a6eb1 14.61%,
    #335391 79.52%,
    #244786 92.77%
  );
`;

export const ButtonPressedOkStyled = styled(ButtonHoverOkStyled)`
  background: radial-gradient(
    92.21% 90.99% at 49.55% 6.31%,
    #4a6eb1 14.61%,
    #335391 79.52%,
    #244786 92.77%
  );
  box-shadow: inset -2px 3px 3px rgba(0, 0, 0, 0.25);
`;

export const ButtonConfirmOkStyled = styled(ButtonBaseOk)`
  border: 1px solid #fcfcfc;
  background: linear-gradient(180deg, #3f663e 0%, #2fe42c 100%);
  box-shadow: inset -2px 3px 3px rgba(0, 0, 0, 0.25);
`;
