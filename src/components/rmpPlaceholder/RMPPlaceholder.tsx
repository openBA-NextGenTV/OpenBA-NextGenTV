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

/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import ResizeDetector from 'react-resize-detector';
import { queryScalePositionWithDebounce, useScaleRMP } from 'hooks/useScaleRMP';
import { Container, RMPPlaceholder as RMPPlaceholderStyles } from './RMPPlaceholder.style';

interface Props {
  alignMenuRight?: boolean;
  tvElement?: ReactElement | null;
}

export const RMPPlaceholder: FC<Props> = ({ alignMenuRight, tvElement }) => {
  const ref = useRef<any>();
  const { scale } = useScaleRMP();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const resizeHandler = (rWidth?: number, rHeight?: number) => {
    if (rWidth) setWidth(rWidth);
    if (rHeight) setHeight(rHeight);
  };

  useEffect(() => {
    if (width && height) {
      scale(width, height, alignMenuRight);
    }

    return () => {
      queryScalePositionWithDebounce({ scaleFactor: 100, xPos: 0, yPos: 0 });
    };
  }, [scale, width, height, alignMenuRight]);

  return (
    <Container>
      <ResizeDetector onResize={resizeHandler} targetRef={ref}>
        <RMPPlaceholderStyles data-test-id="broadcast-area" ref={ref}>
          {tvElement}
        </RMPPlaceholderStyles>
      </ResizeDetector>
    </Container>
  );
};
