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

import { IconName } from 'components/iconButton';
import { SKIP_SECONDS } from 'components/player/video/hooks/useControls';

const SKIP_LABEL = `${SKIP_SECONDS} SEC`;

type IconButton = {
  name: IconName;
  width: number;
  label?: string;
};

type ControlsButtons = {
  exit: IconButton;
  fastForward: IconButton;
  guide: IconButton;
  info: IconButton;
  pause: IconButton;
  play: IconButton;
  rewind: IconButton;
};

export const CONTROLS_BUTTONS: ControlsButtons = {
  info: {
    name: 'arrow_up',
    width: 32,
    label: 'Info',
  },
  guide: {
    name: 'arrow_right',
    width: 36,
    label: 'Guide',
  },
  rewind: {
    name: 'rewind',
    width: 38,
    label: SKIP_LABEL,
  },
  fastForward: {
    name: 'fast_forward',
    width: 38,
    label: SKIP_LABEL,
  },
  play: {
    name: 'play',
    width: 38,
  },
  pause: {
    name: 'pause',
    width: 24,
  },
  exit: {
    name: 'exit',
    width: 43,
    label: 'Exit',
  },
};
