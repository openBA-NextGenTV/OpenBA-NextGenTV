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

import { FC, useCallback, useState } from 'react';
import ReactGA from 'react-ga4';
import { FEEDS } from 'configs/ineractiveGroupViewId';
import { useSkeletonMenu } from 'hooks/useSkeletonMenu';
import { BottomElement } from 'hooks/useSkeletonMenu/skeletonMenuEnums';
import { Command } from 'types/Command';
import { FeedCategory } from 'types/Feed';
import { GaAction } from 'types/GA';
import { BottomCarousel } from 'components/BottomCarousel';
import { useMonitorButtons } from 'components/BottomCarousel/useMonitorButtons';
import { InteractiveGroupProps } from 'components/interactive';
import { MenuItem } from './components/menuItem';
import { categoryToTitleMap } from './components/menuItem/MenuItemsConfig';

const menuItems: { category: FeedCategory; element: string }[] = [
  { category: FeedCategory.TopStories, element: BottomElement.VOD_TOP_STORIES },
  { category: FeedCategory.LocalNews, element: BottomElement.VOD_LOCAL_NEWS },
  { category: FeedCategory.NationWorld, element: BottomElement.VOD_NATION_WORLD },
  { category: FeedCategory.Weather, element: BottomElement.VOD_WEATHER },
  { category: FeedCategory.Sports, element: BottomElement.VOD_SPORTS },
  { category: FeedCategory.Radio, element: BottomElement.LOCAL_RADIO },
  { category: FeedCategory.Entertainment, element: BottomElement.VOD_ENTERTAIMENT },
];

const handleCommands = [Command.ArrowLeft, Command.ArrowRight, Command.Enter];

type Props = {
  disabled?: boolean;
  statusMessage?: string;
};

export const Feeds: FC<Props> = ({ disabled, statusMessage }) => {
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(false);

  useMonitorButtons(setActive, disabled);
  const { setMenuComponent } = useSkeletonMenu();

  const customEnterHandler = useCallback(() => {
    ReactGA.event({
      category: 'Menu',
      action: GaAction.Enter,
      label: categoryToTitleMap[menuItems[selected].category],
    });

    setMenuComponent({ BottomMenu: menuItems[selected].element });
  }, [setMenuComponent, selected]);

  const clickHandler = useCallback(
    (index: number) => () => {
      ReactGA.event({
        category: 'Menu',
        action: GaAction.Click,
        label: categoryToTitleMap[menuItems[index].category],
      });

      setMenuComponent({ BottomMenu: menuItems[index].element });
    },
    [setMenuComponent]
  );

  const interactiveGroupProps: InteractiveGroupProps = {
    viewId: FEEDS,
    groupActive: !disabled,
    customEnterHandler,
    handleCommands,
    setSavedIndex: setSelected,
  };

  return (
    <BottomCarousel
      interactiveGroupProps={interactiveGroupProps}
      itemsCount={menuItems.length}
      setSelected={setSelected}
      statusMessage={statusMessage}
      isSubmenu={false}
      items={menuItems.map((item, index) => (
        <MenuItem
          type={item.category}
          key={item.category}
          selected={selected === index}
          active={active}
          onClick={clickHandler(index)}
        />
      ))}
    />
  );
};
