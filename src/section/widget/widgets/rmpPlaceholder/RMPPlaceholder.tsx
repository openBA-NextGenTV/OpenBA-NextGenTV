/*
 * Copyright 2021 OpenBA-NextGenTV Contributors (https://OpenBA-NextGenTV.tech)
 * Copyright 2021 Sinclair Broadcast Group, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useRef, useState } from 'react';
import ResizeDetector from 'react-resize-detector';

import { useScaleRMP } from '../../../../hooks';
import { Container, RMPPlaceholder as RMPPlaceholderStyles } from './RMPPlaceholder.style';

export const RMPPlaceholder = () => {
  const ref = useRef<any>();
  const { scale } = useScaleRMP();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const resizeHandler = (width: number, height: number) => {
    setWidth(width);
    setHeight(height);
  };

  useEffect(() => {
    if (width && height) {
      scale(width, height);
    }
  }, [scale, width, height]);

  return (
    <Container>
      <ResizeDetector onResize={resizeHandler} targetRef={ref}>
        <RMPPlaceholderStyles ref={ref} />
      </ResizeDetector>
    </Container>
  );
};
