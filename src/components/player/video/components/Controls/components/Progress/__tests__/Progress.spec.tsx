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

import { render } from '@testing-library/react';
import { EMPTY_TIME_STRING } from 'utils/time';
import { Progress } from '../index';

jest.mock('../Styles', () => ({
  Bar: ({ children }: { children: React.ReactNode }) => <div data-testid="Bar">{children}</div>,
  Times: ({ children }: { children: React.ReactNode }) => <div data-testid="Times">{children}</div>,
}));

const timesProp = { timeHasPassed: EMPTY_TIME_STRING, duration: EMPTY_TIME_STRING };

describe('Progress should be rendered', () => {
  test('with default props', () => {
    const { queryByTestId } = render(
      <Progress isFullScreen={false} progress={0} times={timesProp} />
    );

    const bar = queryByTestId(/Bar/);
    const times = queryByTestId(/Times/);

    expect(bar).toBeInTheDocument();
    expect(times).toBeInTheDocument();
  });
});
