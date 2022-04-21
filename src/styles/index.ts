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

interface RowProps {
  ACAround?: boolean;
  ACBetween?: boolean;
  ACCenter?: boolean;
  ACEnd?: boolean;
  ACStart?: boolean;
  AIBaseline?: boolean;
  AICenter?: boolean;
  AIEnd?: boolean;
  AIStretch?: boolean;
  JCAround?: boolean;
  JCBetween?: boolean;
  JCCenter?: boolean;
  JCEnd?: boolean;
  column?: boolean;
  mb?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  noWrap?: boolean;
  wrapReverse?: boolean;
}

export const Row = styled.div<RowProps>`
  margin: ${(props) =>
    `${props.mt || 0}px ${props.mr || 0}px ${props.mb || 0}px ${props.ml || 0}px`};

  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  flex-wrap: ${(props) => {
    if (props.wrapReverse) return 'wrap-reverse';
    if (props.noWrap) return 'nowrap';

    return 'wrap';
  }};
  justify-content: ${(props) => {
    if (props.JCCenter) return 'center';
    if (props.JCAround) return 'space-around';
    if (props.JCBetween) return 'space-between';
    if (props.JCEnd) return 'flex-end';

    return 'flex-start';
  }};
  align-items: ${(props) => {
    if (props.AIStretch) return 'stretch';
    if (props.AIEnd) return 'flex-end';
    if (props.AICenter) return 'center';
    if (props.AIBaseline) return 'baseline';

    return 'flex-start';
  }};
  align-content: ${(props) => {
    if (props.ACStart) return 'flex-start';
    if (props.ACEnd) return 'flex-end';
    if (props.ACCenter) return 'center';
    if (props.ACBetween) return 'space-between';
    if (props.ACAround) return 'space-around';

    return 'stretch';
  }};
`;

interface ColumnProps {
  four?: boolean;
  mb?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  three?: boolean;
  two?: boolean;
}

export const Column = styled.div<ColumnProps>`
  margin: ${(props) =>
    `${props.mt || 0}px ${props.mr || 0}px ${props.mb || 0}px ${props.ml || 0}px`};
  width: ${(props) => {
    if (props.two) return '50%';
    if (props.three) return '33.33%';
    if (props.four) return '25%';

    return '100%';
  }};
`;
