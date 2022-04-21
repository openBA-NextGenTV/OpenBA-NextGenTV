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

/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { FC, memo, MutableRefObject } from 'react';
import {
  ButtonLabel,
  ButtonWrapper,
  IconButtonImg,
  IconDefaultContainer,
  IconDisabledContainer,
  IconHoverContainer,
  IconSelectedContainer,
} from './Styles';

const conditionRelations = {
  default: IconDefaultContainer,
  hover: IconHoverContainer,
  selected: IconSelectedContainer,
  disabled: IconDisabledContainer,
};

export type IconName =
  | 'emergency'
  | 'settings'
  | 'rewind'
  | 'fast_forward'
  | 'weather'
  | 'faq'
  | 'play'
  | 'pause'
  | 'arrow_up'
  | 'arrow_right'
  | 'arrow_down'
  | 'arrow_left'
  | 'exit';

interface Props {
  icon: IconName;
  buttonLabel?: string;
  containerRef?: MutableRefObject<HTMLElement | null>;
  iconWidth?: number;
  size?: number;
  state?: 'default' | 'hover' | 'selected' | 'disabled';
  transparent?: boolean;
}

const IconButtonPure: FC<Props> = ({
  icon,
  state = 'default',
  size = 60,
  containerRef,
  iconWidth,
  buttonLabel,
  transparent,
}) => {
  const ButtonElement = conditionRelations[state];

  const src = `./assets/icons/${icon}${
    state === 'hover' || state === 'selected' ? '_filled' : ''
  }.svg`;

  const button = (
    <ButtonElement
      data-test-id={`${icon}-nav-button`}
      size={size}
      ref={(instance) => (containerRef ? (containerRef.current = instance) : null)}
      transparent={transparent}
    >
      <IconButtonImg src={src} width={iconWidth} />
    </ButtonElement>
  );

  return buttonLabel ? (
    <ButtonWrapper>
      {button}
      <ButtonLabel> {buttonLabel}</ButtonLabel>
    </ButtonWrapper>
  ) : (
    button
  );
};

export const IconButton = memo(IconButtonPure);
