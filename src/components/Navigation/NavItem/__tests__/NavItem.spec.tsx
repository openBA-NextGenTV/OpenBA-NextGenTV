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
import { NavItem } from '../NavItem';

jest.mock('../Styles', () => ({
  ItemContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="ItemContainer" role="banner">
      {children}
    </div>
  ),
  ItemText: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="ItemText" role="banner">
      {children}
    </div>
  ),
}));

describe('NavItem', () => {
  test('should be rendered', () => {
    const { queryByTestId, queryByText } = render(<NavItem icon={<>testIcon</>} text="testText" />);
    const container = queryByTestId(/ItemContainer/);
    const icon = queryByText('testIcon');
    const text = queryByTestId(/ItemText/);

    expect(container).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
