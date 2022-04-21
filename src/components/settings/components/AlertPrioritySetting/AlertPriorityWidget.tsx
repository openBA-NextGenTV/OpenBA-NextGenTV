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

import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ALERT_PRIORITY } from 'configs/ineractiveGroupViewId';
import { SettingsElementProps } from 'pages/settings/components/settingsComponent';
import { userSettingsActions } from 'redux/slices/userSettings';
import { Command } from 'types/Command';
import { InteractiveGroup } from 'components/interactive';
import { Container, Title } from 'components/settings/components/zipCode/Styles';
import { SettingsMap } from './SettingsMap';
import { Description, Option, OptionsContainer, SelectedOption, Wrapper } from './Styles';
import { getAlertPriority, setAlertPriority } from './useAlertPriority';

const handleCommands = [
  Command.ArrowLeft,
  Command.ArrowRight,
  Command.ArrowUp,
  Command.ArrowDown,
  Command.Backspace,
];

const AlertPriorityWidgetPure: FC<SettingsElementProps> = ({
  selected,
  active,
  setSettingsActiveGroup,
}) => {
  const dispatch = useDispatch();
  const [selectedPriority, setSelectedPriority] = useState(getAlertPriority);

  useEffect(() => {
    setAlertPriority(SettingsMap[selectedPriority].priority);

    dispatch(
      userSettingsActions.setAlertPriority({
        alertPriority: SettingsMap[selectedPriority].priority,
      })
    );
  }, [selectedPriority, dispatch]);

  const customHandlerRight = useCallback(() => {
    setSelectedPriority(selectedPriority + 1 > SettingsMap.length - 1 ? 0 : selectedPriority + 1);
  }, [setSelectedPriority, selectedPriority]);

  const customHandlerLeft = useCallback(() => {
    setSelectedPriority(selectedPriority - 1 < 0 ? SettingsMap.length - 1 : selectedPriority - 1);
  }, [setSelectedPriority, selectedPriority]);

  return (
    <Container data-test-id="alert-priority-container" selected={selected}>
      <InteractiveGroup
        viewId={ALERT_PRIORITY}
        isUnique
        groupActive={active}
        handleCommands={handleCommands}
        customBackHandler={setSettingsActiveGroup}
        customHandlerRight={customHandlerRight}
        customHandlerLeft={customHandlerLeft}
      />
      <Title>Emergency Alert Settings</Title>
      <Wrapper data-test-id="alert-priority-selector">
        <OptionsContainer>
          <SelectedOption position={selectedPriority}>{selectedPriority}</SelectedOption>
          {SettingsMap.map(({ priority }, index) => (
            <Option
              data-test-id="alert-priority-option"
              key={priority}
              onClick={() => {
                setSelectedPriority(index);
              }}
            />
          ))}
        </OptionsContainer>
      </Wrapper>
      <Description>{SettingsMap[selectedPriority].text}</Description>
    </Container>
  );
};

export const AlertPriorityWidget = memo(AlertPriorityWidgetPure);
