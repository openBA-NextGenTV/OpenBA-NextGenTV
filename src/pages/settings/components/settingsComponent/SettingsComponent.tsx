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

import { FC, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { SETTINGS, ZIPCODE } from 'configs/ineractiveGroupViewId';
import { Container } from 'pages/settings/components/settingsComponent/Styles';
import { appConfigSelectors } from 'redux/slices/appConfig';
import { Command } from 'types/Command';
import { InteractiveElement, InteractiveGroup } from 'components/interactive';
import {
  AlertPriorityWidget,
  PrivacyPolicyWidget,
  SystemInformationWidget,
  TermsAndConditionsWidget,
  ZipCode,
} from 'components/settings';
import { setFocusedItemToTop } from './utils';

export type SettingsElementProps = {
  active: boolean;
  selected: boolean;
  setSettingsActiveGroup: () => void;
};

const settingsHandleCommands = [Command.ArrowDown, Command.ArrowUp, Command.Enter];
const handleAfterVies = [ZIPCODE];

export const SettingsComponent: FC<{}> = () => {
  const [selected, setSelected] = useState(0);
  const [activeGroup, setActiveGroup] = useState(true);
  const [activeElement, setActiveElement] = useState(-1);
  const settingRef = useRef(null);
  const privacyPolicy = useSelector(appConfigSelectors.getAppPrivacyPolicy);
  const termsAndConditions = useSelector(appConfigSelectors.getAppTermsAndConditions);

  const setSettingsActiveGroup = useCallback(() => {
    setActiveElement(-1);
    setActiveGroup(true);
  }, [setActiveElement, setActiveGroup]);

  const settingItems = [ZipCode, AlertPriorityWidget];

  if (privacyPolicy) {
    settingItems.push(PrivacyPolicyWidget);
  }

  if (termsAndConditions) {
    settingItems.push(TermsAndConditionsWidget);
  }

  settingItems.push(SystemInformationWidget);

  const customEnterHandler = useCallback(() => {
    setActiveElement(selected);
    setActiveGroup(false);
  }, [setActiveElement, selected, setActiveGroup]);

  const setSelectedHandler = (index: number, smooth?: boolean) => {
    setFocusedItemToTop(settingRef, index, smooth);
    setSelected(index);
  };

  const customHandlerIncrement = useCallback(
    () => setSelectedHandler((selected + 1) % settingItems.length, true),
    [selected, settingItems.length]
  );

  const customHandlerDicrement = useCallback(
    () => setSelectedHandler((selected || settingItems.length) - 1, true),
    [selected, settingItems.length]
  );

  return (
    <Container ref={settingRef} data-test-id="settings-carousel">
      <InteractiveGroup
        viewId={SETTINGS}
        initialHighlight
        setSavedIndex={setSelectedHandler}
        setDirectionPriorityMount={Command.ArrowDown}
        groupActive={activeGroup}
        handleCommands={settingsHandleCommands}
        handlesAfterVies={handleAfterVies}
        customEnterHandler={customEnterHandler}
        customHandlerDown={customHandlerIncrement}
        customHandlerUp={customHandlerDicrement}
      >
        {settingItems.map((Item, index) => (
          <InteractiveElement
            onClick={() => {
              setSelectedHandler(index, true);
              setActiveElement(index);
              setActiveGroup(false);
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            normalElement={
              <Item
                selected={false}
                active={index === activeElement}
                setSettingsActiveGroup={setSettingsActiveGroup}
              />
            }
            hoverElement={
              <Item
                selected
                active={index === activeElement}
                setSettingsActiveGroup={setSettingsActiveGroup}
              />
            }
          />
        ))}
      </InteractiveGroup>
    </Container>
  );
};
