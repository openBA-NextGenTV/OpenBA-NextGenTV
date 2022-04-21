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

import { FC, RefObject, useRef } from 'react';
import { useSelector } from 'react-redux';
import { appConfigSelectors } from 'redux/slices/appConfig';
import { deviceSelectors } from 'redux/slices/device';
import { Command } from 'types/Command';
import { Icon } from 'components/Icon';
import Modal from 'components/Modal';
import {
  ModalContentContainer,
  ModalIconWrapper,
  ModalMenuWrapper,
  ModalTextContainer,
  ModalTextContainerWrapper,
} from 'components/Modal/styles';
import { useModalNavigation } from 'components/Modal/useModalNav.hook';
import { prepareText } from 'components/Modal/utils';
import { NavBar } from 'components/Navigation/navigation/NavBar';
import { NavIcons } from 'components/Navigation/navigation/NavIcon';
import { modalBackgroundColor, SettingsIconWrapper } from 'components/settings/styles';

const handleCommands = [Command.ArrowUp, Command.ArrowDown, Command.Backspace];

const navItems = [
  { text: 'details', icon: NavIcons.Vertically },
  { text: 'exit', icon: NavIcons.Back },
];

interface Props {
  handleClose: () => void;
}

export const PrivacyPolicyModal: FC<Props> = ({ handleClose }) => {
  const textContainerRef: RefObject<HTMLDivElement> = useRef(null);
  const text = useSelector(appConfigSelectors.getAppPrivacyPolicy);
  const { deviceId } = useSelector(deviceSelectors.getDeviceInfo);
  const textToRender = prepareText((text || '').replace('{deviceId}', deviceId || ''), false);
  const { downNavigationHandler, upNavigationHandler } = useModalNavigation(textContainerRef);

  return (
    <Modal
      color={modalBackgroundColor}
      handleCommands={handleCommands}
      navigationDownHandler={downNavigationHandler}
      navigationUpHandler={upNavigationHandler}
      handleClose={handleClose}
    >
      <ModalIconWrapper>
        <SettingsIconWrapper>
          <Icon name="SettingsFilled" />
        </SettingsIconWrapper>
      </ModalIconWrapper>
      <ModalContentContainer>
        <ModalTextContainerWrapper>
          <ModalTextContainer ref={textContainerRef}>{textToRender}</ModalTextContainer>
        </ModalTextContainerWrapper>
      </ModalContentContainer>
      <ModalMenuWrapper>
        <NavBar items={navItems} />
      </ModalMenuWrapper>
    </Modal>
  );
};
