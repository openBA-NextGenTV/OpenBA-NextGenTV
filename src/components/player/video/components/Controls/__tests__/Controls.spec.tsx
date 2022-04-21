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
import { Controls } from '../index';

jest.mock('../Styles', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Container">{children}</div>
  ),
}));

jest.mock('../components', () => ({
  Commands: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Commands">{children}</div>
  ),
  Progress: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Progress">{children}</div>
  ),
}));

const playerRef = {
  current: document.createElement('video'),
};

const plugHandler = () => null;

describe('Controls should be rendered', () => {
  test('with default props', () => {
    const { queryByTestId } = render(
      <Controls
        controlsDisabled={false}
        isFullScreen={false}
        isFullScreenAllowed
        isStream={false}
        setIsFullScreen={plugHandler}
        playerRef={playerRef}
      />
    );

    const container = queryByTestId(/Container/);
    const commands = queryByTestId(/Commands/);
    const progress = queryByTestId(/Progress/);

    expect(container).toBeInTheDocument();
    expect(commands).not.toBeInTheDocument();
    expect(progress).not.toBeInTheDocument();
  });

  test('for full screen state', () => {
    const { queryByTestId } = render(
      <Controls
        controlsDisabled={false}
        isFullScreen
        isFullScreenAllowed
        isStream={false}
        setIsFullScreen={plugHandler}
        playerRef={playerRef}
      />
    );

    const container = queryByTestId(/Container/);
    const commands = queryByTestId(/Commands/);
    const progress = queryByTestId(/Progress/);

    expect(container).toBeInTheDocument();
    expect(commands).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
  });

  test('for stream', () => {
    const { queryByTestId } = render(
      <Controls
        controlsDisabled={false}
        isFullScreen
        isFullScreenAllowed
        isStream
        setIsFullScreen={plugHandler}
        playerRef={playerRef}
      />
    );

    const container = queryByTestId(/Container/);
    const commands = queryByTestId(/Commands/);
    const progress = queryByTestId(/Progress/);

    expect(container).toBeInTheDocument();
    expect(commands).toBeInTheDocument();
    expect(progress).not.toBeInTheDocument();
  });
});
