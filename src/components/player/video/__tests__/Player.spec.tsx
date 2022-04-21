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
import { VideoPlayer } from '../Player';

jest.mock('../Styles', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Container">{children}</div>
  ),
  Title: ({ children }: { children: React.ReactNode }) => <div data-testid="Title">{children}</div>,
  Video: ({ children }: { children: React.ReactNode }) => <div data-testid="Video">{children}</div>,
  Plug: ({ children }: { children: React.ReactNode }) => <div data-testid="Plug">{children}</div>,
}));

jest.mock('../components/Controls', () => ({
  Controls: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Controls">{children}</div>
  ),
}));

describe('VideoPlayer should be rendered', () => {
  test('without any props', () => {
    const { queryByTestId } = render(<VideoPlayer />);
    const container = queryByTestId(/Container/);
    const title = queryByTestId(/Title/);
    const controls = queryByTestId(/Controls/);
    const plug = queryByTestId(/Plug/);

    expect(container).toBeInTheDocument();
    expect(title).not.toBeInTheDocument();
    expect(controls).not.toBeInTheDocument();
    expect(plug).toBeInTheDocument();
  });

  test('with props', () => {
    const { queryByTestId } = render(
      <VideoPlayer title="Title" url="url" isFullScreenAllowed={false} />
    );

    const container = queryByTestId(/Container/);
    const title = queryByTestId(/Title/);
    const controls = queryByTestId(/Controls/);
    const plug = queryByTestId(/Plug/);

    expect(container).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(controls).toBeInTheDocument();
    expect(plug).not.toBeInTheDocument();
  });
});
