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
import { Commands } from '../index';

jest.mock('../Styles', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Container">{children}</div>
  ),
  Group: ({ children }: { children: React.ReactNode }) => <div data-testid="Group">{children}</div>,
}));

jest.mock('components', () => ({
  IconButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Icon">{children}</div>
  ),
}));

describe('Commands should be rendered', () => {
  test('with default props', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <Commands paused={false} isStream={false} />
    );

    const container = queryByTestId(/Container/);
    const groups = queryAllByTestId(/Group/);
    const icons = queryAllByTestId(/Icon/);

    expect(container).toBeInTheDocument();
    expect(groups.length).toEqual(3);
    expect(icons.length).toEqual(4);
  });

  test('for steam', () => {
    const { queryByTestId, queryAllByTestId } = render(<Commands paused={false} isStream />);
    const container = queryByTestId(/Container/);
    const groups = queryAllByTestId(/Group/);
    const icons = queryAllByTestId(/Icon/);

    expect(container).toBeInTheDocument();
    expect(groups.length).toEqual(3);
    expect(icons.length).toEqual(1);
  });
});
