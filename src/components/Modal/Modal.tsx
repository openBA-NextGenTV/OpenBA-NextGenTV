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

import ReactDOM from 'react-dom';
import { MODAL } from 'configs/ineractiveGroupViewId';
import { Command } from 'types/Command';
import { InteractiveGroup } from 'components/interactive';
import * as S from './styles';

interface IModalProps {
  children: React.ReactNode;
  color?: string;
}

interface IInteractiveGroupProps {
  handleClose?: () => void;
  handleCommands?: Command[];
  navigationDownHandler?: () => void;
  navigationLeftHandler?: () => void;
  navigationRightHandler?: () => void;
  navigationUpHandler?: () => void;
}

function Modal({
  color,
  children,
  handleClose,
  navigationDownHandler,
  navigationUpHandler,
  navigationLeftHandler,
  navigationRightHandler,
  handleCommands,
}: IModalProps & IInteractiveGroupProps) {
  return ReactDOM.createPortal(
    <S.ModalOverlay>
      <S.Modal data-test-id="modal" color={color}>
        <InteractiveGroup
          isUnique
          viewId={MODAL}
          customBackHandler={handleClose}
          customHandlerDown={navigationDownHandler}
          customHandlerUp={navigationUpHandler}
          customHandlerLeft={navigationLeftHandler}
          customHandlerRight={navigationRightHandler}
          handleCommands={handleCommands}
        />
        {children}
      </S.Modal>
    </S.ModalOverlay>,
    document.getElementById('root')!
  );
}

export default Modal;
