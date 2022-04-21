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

/* eslint-disable import/no-cycle */
import { FC, ReactElement } from 'react';
import { plugHandler } from 'utils/navigation';
import { useRegisterElementInContext } from './hooks/useRegisterElementInContext';
import { WrapperDefault, WrapperSelected } from './Styles';

interface WrapperProps {
  normalElement: ReactElement | null;
  onClick: () => void;
  disableElement?: ReactElement;
  disabled?: boolean;
  hoverElement?: ReactElement;
  registredPosition?: number;
  uuid?: string;
}

export type InteractiveElementState = 'normal' | 'selected' | 'disabled';

export const InteractiveElement: FC<WrapperProps> = ({
  normalElement,
  hoverElement,
  disableElement,
  onClick,
  uuid = '',
  registredPosition,
  disabled = false,
}) => {
  const { state } = useRegisterElementInContext(onClick, uuid, registredPosition, disabled);

  switch (state) {
    case 'selected': {
      const [Wrapper, element] = hoverElement
        ? [WrapperDefault, hoverElement]
        : [WrapperSelected, normalElement];

      return <Wrapper onClick={onClick}>{element}</Wrapper>;
    }

    case 'disabled':
      return <WrapperDefault onClick={plugHandler}>{disableElement}</WrapperDefault>;

    default:
      return <WrapperDefault onClick={onClick}>{normalElement}</WrapperDefault>;
  }
};
