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

import { FC, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CONTROLS } from 'configs/ineractiveGroupViewId';
import { useSkeletonMenu } from 'hooks/useSkeletonMenu';
import {
  BottomElement,
  ControlsElement,
  WidgetElement,
} from 'hooks/useSkeletonMenu/skeletonMenuEnums';
import { alertSelectors } from 'redux/slices/alerts';
import { ALERTS } from 'routes';
import { Command } from 'types/Command';
import { IconButton } from 'components/iconButton';
import { InteractiveElement, InteractiveGroup } from 'components/interactive';
import { ItemContainer, MenuItemIndicator, MenuItemText } from './Styles';

interface ButtonIcon {
  icon: 'emergency' | 'faq' | 'settings' | 'weather';
  onClick: () => void;
  text: string;
  condition?: boolean;
  indicator?: number;
}

const handleCommands = [Command.ArrowUp, Command.ArrowDown, Command.Enter];

export const Controls: FC<{}> = () => {
  const navigate = useNavigate();
  const alerts = useSelector(alertSelectors.getAlertsFiltered);
  const emergencyClickHandler = useCallback(() => navigate(ALERTS), [navigate]);
  const { setMenuComponent } = useSkeletonMenu();

  const settingsClickHandler = useCallback(
    () =>
      setMenuComponent({
        Widget: WidgetElement.SETTINGS,
        Controls: ControlsElement.SELECTED_MENU_SETTINGS,
      }),
    [setMenuComponent]
  );

  const weatherClickHandler = useCallback(
    () =>
      setMenuComponent({
        Widget: WidgetElement.DAILYFORECAST,
        Controls: ControlsElement.SELECTED_MENU_WEATHER,
        BottomMenu: BottomElement.SIX_DAY_FORECAST,
      }),
    [setMenuComponent]
  );

  const learnMoreClickHandler = useCallback(
    () =>
      setMenuComponent({
        Widget: WidgetElement.LEARN_MORE,
        Controls: ControlsElement.SELECTED_MENU_LEARN_MORE,
      }),
    [setMenuComponent]
  );

  const buttonsSetting: ButtonIcon[] = useMemo(
    () => [
      {
        icon: 'emergency',
        text: 'Alerts',
        onClick: emergencyClickHandler,
        condition: Boolean(alerts.length),
        indicator: alerts.length,
      },
      { icon: 'weather', text: 'Weather', onClick: weatherClickHandler, condition: true },
      { icon: 'settings', text: 'Settings', onClick: settingsClickHandler, condition: true },
      { icon: 'faq', text: 'Learn More', onClick: learnMoreClickHandler, condition: true },
    ],
    [
      emergencyClickHandler,
      alerts.length,
      weatherClickHandler,
      settingsClickHandler,
      learnMoreClickHandler,
    ]
  );

  const getMenuItemElement = (menuItem: ButtonIcon, state?: 'hover' | 'disabled') => (
    <ItemContainer hover={state === 'hover'}>
      <IconButton state={state === 'disabled' ? 'disabled' : undefined} icon={menuItem.icon} />
      <MenuItemText>{menuItem.text}</MenuItemText>
      {menuItem.indicator ? <MenuItemIndicator>{menuItem.indicator}</MenuItemIndicator> : null}
    </ItemContainer>
  );

  return (
    <InteractiveGroup viewId={CONTROLS} handleCommands={handleCommands}>
      {buttonsSetting.map((setting, index) => (
        <InteractiveElement
          registredPosition={index}
          key={setting.icon}
          hoverElement={getMenuItemElement(setting, 'hover')}
          normalElement={getMenuItemElement(setting)}
          disableElement={getMenuItemElement(setting, 'disabled')}
          onClick={setting.onClick}
          disabled={!setting.condition}
        />
      ))}
    </InteractiveGroup>
  );
};
