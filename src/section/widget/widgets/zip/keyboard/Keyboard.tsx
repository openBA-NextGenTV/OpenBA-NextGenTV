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

import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { createMetric, createWidget } from '../../../../../apollo/typeFactory';
import { Command, registerView, unregisterView } from '../../../../../hooks';
import { useMenusModel, useWidgetOperations } from '../../../../../state';
import { CancelButton, Container, DeleteButton, DigitButton, OkButton } from './Keyboard.styles';

const ZIP_VIEW_ID = 'ZIP';
const EASTER_KEY = '12deldel34deldel56deldel78deldel90deldel0';

type KeyboardProps = {
  okDisabled: boolean;
  delDisabled: boolean;
  onDigitClick: (value: string) => void;
  onDeleteClick: () => void;
  onOkClick: () => void;
};

type ButtonProps = {
  selected: boolean;
  value: string;
  disabled?: boolean;
  onClick?: (item: any) => void;
  isMenuDisabled: boolean;
};

export const Keyboard: FC<KeyboardProps> = ({ onDigitClick, onDeleteClick, onOkClick, delDisabled, okDisabled }) => {
  const allButtons: {
    [key: string]: { position: number; disabled?: boolean; component: FC<ButtonProps> };
  } = useMemo(
    () => ({
      '1': { position: 0, component: DigitButton },
      '2': { position: 1, component: DigitButton },
      '3': { position: 2, component: DigitButton },
      '4': { position: 3, component: DigitButton },
      '5': { position: 4, component: DigitButton },
      '6': { position: 5, component: DigitButton },
      '7': { position: 6, component: DigitButton },
      '8': { position: 7, component: DigitButton },
      '9': { position: 8, component: DigitButton },
      '0': { position: 10, component: DigitButton },
      del: { position: 9, component: DeleteButton, disabled: delDisabled },
      ok: { position: 11, component: OkButton, disabled: okDisabled },
      cancel: { position: 12, component: CancelButton },
    }),
    [okDisabled, delDisabled],
  );

  const [focusedButtonIndex, setFocusedButtonIndex] = useState(0);
  const { openWidget, closeWidget } = useWidgetOperations();
  const [key, setKey] = useState('');
  const { isDisable: isMenuDisabled } = useMenusModel();

  //easter egg for File List Widget
  const addEasterKey = useCallback(
    (value: string) => {
      const newKey = key + value;

      EASTER_KEY.indexOf(newKey) === 0 ? setKey(newKey) : setKey('');

      if (EASTER_KEY === newKey) {
        openWidget(createWidget('fileList', null, createMetric('File List')));
      }
    },
    [key, openWidget],
  );

  const processButtonClick = useCallback(
    (value: string) => {
      addEasterKey(value);

      switch (value) {
        case 'ok':
          if (okDisabled) {
            return;
          }
          onOkClick();
          break;
        case 'cancel':
          closeWidget();
          break;
        case 'del':
          if (delDisabled) {
            return;
          }
          onDeleteClick();
          break;
        default:
          onDigitClick(value);
          break;
      }
    },
    [okDisabled, delDisabled, addEasterKey, closeWidget, onOkClick, onDeleteClick, onDigitClick],
  );

  const handleSelectListener = useCallback(() => {
    const value = Object.keys(allButtons).find(element => allButtons[element].position === focusedButtonIndex) || '';
    processButtonClick(value);
  }, [processButtonClick, allButtons, focusedButtonIndex]);

  const commandListener = useCallback(
    (command: Command) => {
      const allButtonsAmount = Object.keys(allButtons).length;
      let newIndex;
      switch (command) {
        case 'ArrowUp':
          newIndex = focusedButtonIndex - 3 >= 0 ? focusedButtonIndex - 3 : allButtonsAmount - 1;
          setFocusedButtonIndex(newIndex);
          break;
        case 'ArrowDown':
          newIndex = [9, 10, 11].includes(focusedButtonIndex)
            ? 12
            : focusedButtonIndex === 12
            ? 0
            : focusedButtonIndex + 3;
          setFocusedButtonIndex(newIndex);
          break;
        case 'ArrowRight':
          newIndex = focusedButtonIndex + 1 >= allButtonsAmount ? 0 : focusedButtonIndex + 1;
          setFocusedButtonIndex(newIndex);
          break;
        case 'ArrowLeft':
          setFocusedButtonIndex(focusedButtonIndex - 1);
          newIndex = focusedButtonIndex - 1 < 0 ? allButtonsAmount - 1 : focusedButtonIndex - 1;
          setFocusedButtonIndex(newIndex);
          break;
        case 'Enter':
          handleSelectListener();
          break;
        case 'Backspace':
          closeWidget();
      }
    },
    [focusedButtonIndex, handleSelectListener, allButtons, closeWidget],
  );

  const handleItemClick = (e: any) => {
    const value = e.target.value;
    setFocusedButtonIndex(allButtons[value].position);
    processButtonClick(value);
  };

  useEffect(() => {
    if (focusedButtonIndex >= 0) {
      registerView({ viewId: ZIP_VIEW_ID, listener: commandListener });
    }

    return () => unregisterView({ viewId: ZIP_VIEW_ID });
  }, [commandListener, focusedButtonIndex]);

  return (
    <Container>
      {Object.keys(allButtons).map(el => {
        const key = el.toString();
        const Component = allButtons[key].component;

        return (
          <Component
            selected={focusedButtonIndex === allButtons[key].position}
            disabled={allButtons[key].disabled}
            isMenuDisabled={isMenuDisabled}
            value={el}
            key={el}
            onClick={handleItemClick}
          >
            {el.toUpperCase()}
          </Component>
        );
      })}
    </Container>
  );
};
