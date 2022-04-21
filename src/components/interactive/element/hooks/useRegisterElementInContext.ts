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
import { useEffect, useState } from 'react';
import { useInteractiveGroupContext } from 'components/interactive/group/contex';
import { InteractiveElementState } from '../InteractiveElement';

export const useRegisterElementInContext = (
  onClick: () => void,
  uuid: string,
  registredPosition?: number,
  disabled = false
) => {
  const [state, setState] = useState<InteractiveElementState>(disabled ? 'disabled' : 'normal');
  const { registerElement } = useInteractiveGroupContext();

  useEffect(() => setState(disabled ? 'disabled' : 'normal'), [disabled]);

  useEffect(() => {
    registerElement({
      state,
      setState,
      onClick,
      uuid,
      registredPosition,
    });
  }, [disabled, state, registerElement, onClick, uuid, registredPosition]);

  return { state };
};
