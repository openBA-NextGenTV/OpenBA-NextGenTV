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

import { RefObject, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { MediaNav } from 'pages/alerts/components/AlertModal/MediaNav';
import { MediaResolver } from 'pages/alerts/components/AlertModal/MediaResolver';
import { AlertCode } from 'pages/alerts/types';
import { Alert } from 'types/Alert';
import { Command } from 'types/Command';
import Modal from 'components/Modal';
import {
  ModalContentContainer,
  ModalMenuWrapper,
  ModalTextContainer,
  ModalTextContainerWrapper,
} from 'components/Modal/styles';
import { useModalMediaNavigation } from 'components/Modal/useModalMediaNav.hook';
import { useModalNavigation } from 'components/Modal/useModalNav.hook';
import { prepareText, resolveNavBar } from 'components/Modal/utils';
import AlertBar from '../AlertBar';
import { MediaNavWrapper, ModalMediaContainer, TitleWrapper } from './styles';

interface IAlertModalProps {
  alert: Alert;
  color: string;
  handleClose: (event?: SyntheticEvent) => void;
  isInternetConnected: boolean;
}

const handleCommands = [
  Command.ArrowUp,
  Command.ArrowDown,
  Command.ArrowLeft,
  Command.ArrowRight,
  Command.Backspace,
];

function AlertModal({ alert, handleClose, color, isInternetConnected }: IAlertModalProps) {
  const textContainerRef: RefObject<HTMLDivElement> = useRef(null);
  const tinyUrl = alert.tinyUrl && `More details: ${alert.tinyUrl}`;
  const { pages, medias } = alert;
  const [media, setMedia] = useState<string[]>([]);

  const text: string[] = [
    alert.message,
    tinyUrl || '',
    ...pages.reduce<string[]>((acc, page) => [...acc, page.title, page.story], []),
  ];

  const textToRender = prepareText(text, false);
  const { downNavigationHandler, upNavigationHandler } = useModalNavigation(textContainerRef);

  const { mediaSelected, leftNavigationHandler, rightNavigationHandler } =
    useModalMediaNavigation(media);

  useEffect(() => {
    const aeatMedias =
      medias?.map(({ url, alternateUrl }) => (isInternetConnected ? alternateUrl : url)) || [];

    const pagesMedias = pages.map(({ mediaUrl }) => mediaUrl).filter(Boolean);

    setMedia(aeatMedias || pagesMedias);
  }, [isInternetConnected, medias, pages]);

  return (
    <Modal
      color={color}
      handleCommands={handleCommands}
      navigationDownHandler={downNavigationHandler}
      navigationLeftHandler={leftNavigationHandler}
      navigationRightHandler={rightNavigationHandler}
      navigationUpHandler={upNavigationHandler}
      handleClose={handleClose}
    >
      <TitleWrapper>
        <AlertBar
          backgroundColor={color}
          alertCode={alert.eventCode as AlertCode}
          alertText={alert.title}
          alertUrl={alert.tinyUrl}
          qrSize={120}
          withoutNav
        />
      </TitleWrapper>
      <ModalContentContainer>
        {media.length > 0 && (
          <ModalMediaContainer color={color}>
            <MediaResolver mediaUrl={media[mediaSelected]} />
            <MediaNavWrapper>
              {media.length > 1 && <MediaNav length={media.length} selected={mediaSelected} />}
            </MediaNavWrapper>
          </ModalMediaContainer>
        )}
        <ModalTextContainerWrapper withMedia={!!media.length}>
          <ModalTextContainer ref={textContainerRef}>{textToRender}</ModalTextContainer>
        </ModalTextContainerWrapper>
      </ModalContentContainer>
      <ModalMenuWrapper>{resolveNavBar(media[mediaSelected])}</ModalMenuWrapper>
    </Modal>
  );
}

export default AlertModal;
