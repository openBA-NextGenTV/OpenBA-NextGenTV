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

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */

import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ZIPCODE } from 'configs/ineractiveGroupViewId';
import { SettingsElementProps } from 'pages/settings/components/settingsComponent';
import { userSettingsActions } from 'redux/slices/userSettings';
import { Command } from 'types/Command';
import { ButtonState } from 'components/buttons';
import { InteractiveGroup } from 'components/interactive';
import { NavIcons, NavMenu } from 'components/Navigation/navigation';
import { ButtonOk } from 'components/settings/components/confirmOk';
import { Container, Description, Title, ZipForm, ZipNumber } from './Styles';
import { getZipCode, setZipCode as setZipCodeToLocalStore } from './useZipCode';
import { ZipNumberItem } from './ZipNumberItem';

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const getZipCodeFromLocalStore = () =>
  getZipCode().length === 5 ? getZipCode() : Array(5).fill(-1);

const fillZipCodeEmptyNumbers = (zipCode: number[]) =>
  zipCode.map((item) => (item >= 0 ? item : 0));

const handleCommands = [
  Command.ArrowDown,
  Command.ArrowUp,
  Command.ArrowLeft,
  Command.ArrowRight,
  Command.Backspace,
  Command.Enter,
];

const navMenuItems = [
  { icon: NavIcons.Ok, text: 'edit' },
  { icon: NavIcons.AllDirections, text: 'change numbers' },
  { icon: NavIcons.Back, text: 'exit' },
];

const ZipCodePure: FC<SettingsElementProps> = ({ active, selected, setSettingsActiveGroup }) => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState(getZipCodeFromLocalStore());
  const [selectedZipCode, setSelectedZipCode] = useState(-1);
  const [buttonState, setButtonState] = useState(ButtonState.Default);

  const isOkButtonSelected = useMemo(
    () => selectedZipCode === zipCode.length,
    [selectedZipCode, zipCode]
  );

  useEffect(() => {
    if (JSON.stringify(zipCode) === JSON.stringify(getZipCode())) {
      setButtonState(ButtonState.Disabled);
    } else if (isOkButtonSelected) {
      setButtonState(ButtonState.Hover);
    } else {
      setButtonState(ButtonState.Default);
    }
  }, [isOkButtonSelected, zipCode, selectedZipCode, buttonState]);

  useEffect(() => {
    if (active && selectedZipCode === -1) {
      setSelectedZipCode(0);
    }
  }, [active, selectedZipCode, setSelectedZipCode]);

  const handlerZipCode = (index: number, value: number) => {
    const zip: number[] = zipCode;

    zip[index] = value;
    setZipCode([...zip]);
  };

  const customEnterHandler = () => {
    const filledZipCode = fillZipCodeEmptyNumbers(zipCode);

    setZipCodeToLocalStore(filledZipCode);
    dispatch(userSettingsActions.setZip({ zip: filledZipCode.join('') }));
    setZipCode(filledZipCode);
    setSelectedZipCode(zipCode.length);
  };

  const handlerButtonClick = (event: ButtonEvent) => {
    event.preventDefault();
    customEnterHandler();
  };

  const customBackHandler = () => {
    setSettingsActiveGroup();
    setSelectedZipCode(-1);
  };

  const setSelectedZipCodeHandler = useCallback(
    (count: number) => {
      const newZipCodeSelected = selectedZipCode + count;

      if (newZipCodeSelected > zipCode.length) {
        setSelectedZipCode(0);
      } else if (newZipCodeSelected < 0) {
        setSelectedZipCode(zipCode.length);
      } else {
        setSelectedZipCode(newZipCodeSelected);
      }
    },
    [setSelectedZipCode, selectedZipCode, zipCode.length]
  );

  const customHandlerIncrement = useCallback(
    () => setSelectedZipCodeHandler(1),
    [setSelectedZipCodeHandler]
  );

  const customHandlerDecrement = useCallback(
    () => setSelectedZipCodeHandler(-1),
    [setSelectedZipCodeHandler]
  );

  const customHandlerDown = useCallback(() => {
    if (isOkButtonSelected) return;

    const zip: number[] = zipCode;

    zip[selectedZipCode] = zip[selectedZipCode] >= 9 ? 0 : zip[selectedZipCode] + 1;

    setZipCode([...zip]);
  }, [isOkButtonSelected, setZipCode, zipCode, selectedZipCode]);

  const customHandlerUp = useCallback(() => {
    if (isOkButtonSelected) return;

    const zip: number[] = zipCode;

    zip[selectedZipCode] = zip[selectedZipCode] <= 0 ? 9 : zip[selectedZipCode] - 1;

    setZipCode([...zip]);
  }, [isOkButtonSelected, setZipCode, zipCode, selectedZipCode]);

  return (
    <Container data-test-id="zip-container" selected={selected}>
      <Title>Set Zip Code</Title>
      <Description>This will enable you to receive alerts specific to your location</Description>
      <ZipForm data-test-id="zip-form">
        <ZipNumber data-test-id="zip-selector">
          <InteractiveGroup
            viewId={ZIPCODE}
            isUnique
            groupActive={active}
            handleCommands={handleCommands}
            customEnterHandler={customEnterHandler}
            customBackHandler={customBackHandler}
            customHandlerRight={customHandlerIncrement}
            customHandlerLeft={customHandlerDecrement}
            customHandlerUp={customHandlerUp}
            customHandlerDown={customHandlerDown}
          >
            {zipCode.map((value, index) => (
              <ZipNumberItem
                key={index}
                index={index}
                value={zipCode[index] === -1 ? '' : `${zipCode[index]}`}
                selected={selectedZipCode === index}
                handlerZipCode={handlerZipCode}
                handlerSelectedZipCode={setSelectedZipCode}
              />
            ))}
          </InteractiveGroup>
        </ZipNumber>

        <ButtonOk
          data-test-id="confirm-zip-button"
          text="OK"
          state={buttonState}
          onClick={handlerButtonClick}
        />
      </ZipForm>

      <NavMenu fontSize={16} items={navMenuItems} />
    </Container>
  );
};

export const ZipCode = memo(ZipCodePure);
