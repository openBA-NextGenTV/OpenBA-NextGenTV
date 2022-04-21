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

import { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRadiosFetch } from 'hooks/useRadios';
import { useSkeletonMenu } from 'hooks/useSkeletonMenu';
import { MenuPosition, WidgetElement } from 'hooks/useSkeletonMenu/skeletonMenuEnums';
import { useTogglePlayer } from 'hooks/useTogglePlayer';
import { skeletonMenuActions } from 'redux/slices/skeletonMenu';
import { getTVElement } from 'redux/slices/skeletonMenu/selectors';
import { Command } from 'types/Command';
import { BottomCarousel } from 'components/BottomCarousel';
import { useMonitorButtons } from 'components/BottomCarousel/useMonitorButtons';
import { InteractiveGroupProps } from 'components/interactive';
import { Message } from 'components/Message';
import { AudioPlayer, VideoPlayer } from 'components/player';
import { MenuItem } from './components/menuItem';
import { StreamType } from './types';

type StationListProps = {
  category: string;
  type: StreamType;
  viewId: string;
};

const handleCommands = [Command.ArrowLeft, Command.ArrowRight, Command.Enter];

const StationList: FC<StationListProps> = ({ viewId, type, category }) => {
  const { getComponentKey } = useSkeletonMenu();
  const widgetElementKey = getComponentKey(MenuPosition.WIDGET);
  const tvElementURL = useSelector(getTVElement)?.props.url;
  const [bottomMenuActive, setBottomMenuActive] = useState(false);
  const { isActivePlayer, setActivePlayer } = useTogglePlayer(Boolean(tvElementURL));
  const { radios, radiosLoading } = useRadiosFetch();

  const [activeElement, setActiveElement] = useState(
    radios.findIndex((item) => item.url === tvElementURL)
  );

  const [selectedElement, setSelectedElement] = useState(
    radios.findIndex((item) => item.url === tvElementURL)
  );

  const dispatch = useDispatch();

  useMonitorButtons(setBottomMenuActive);

  const handleSetActiveElement = useCallback(
    (active: number) => {
      setActiveElement(active);
      setActivePlayer(true);
    },
    [setActiveElement, setActivePlayer]
  );

  const customEnterHandler = useCallback(
    () => handleSetActiveElement(selectedElement),
    [handleSetActiveElement, selectedElement]
  );

  const players: { [K in StreamType]: ReactElement } = useMemo(
    () => ({
      audio: (
        <AudioPlayer
          category={category}
          url={radios[activeElement]?.url}
          label={radios[activeElement]?.label}
          labelHidden={radios[activeElement]?.labelHidden}
          image={radios[activeElement]?.logo}
          screenCoverSrc="./assets/menuBackgrounds/radio.jpg"
        />
      ),
      video: (
        <VideoPlayer
          url={radios[activeElement]?.url}
          controlsDisabled={
            selectedElement !== activeElement || widgetElementKey === WidgetElement.SETTINGS
          }
          isStream
          title={radios[activeElement]?.label}
          category={category}
        />
      ),
    }),
    [activeElement, category, radios, selectedElement, widgetElementKey]
  );

  useEffect(() => {
    const tvElement = isActivePlayer ? players[type] : null;

    dispatch(skeletonMenuActions.setTVElement({ tvElement }));
  }, [isActivePlayer, selectedElement, activeElement, players, type, dispatch]);

  const menuItemsToRender = useMemo(() => {
    if (!radios?.length) return <Message>Currently, there are no Radios available.</Message>;

    return radios.map((item, index) => (
      <MenuItem
        {...item}
        image={item.logo}
        key={item.label}
        active={bottomMenuActive}
        selected={index === selectedElement}
        onClick={() => {
          setSelectedElement(index);
          handleSetActiveElement(index);
        }}
      />
    ));
  }, [bottomMenuActive, radios, handleSetActiveElement, selectedElement]);

  const interactiveGroupProps: InteractiveGroupProps = {
    viewId,
    handleCommands,
    initialHighlight: true,
    setSavedIndex: setSelectedElement,
    customEnterHandler,
  };

  return (
    <BottomCarousel
      items={menuItemsToRender}
      interactiveGroupProps={interactiveGroupProps}
      itemsCount={radios.length}
      statusMessage={radiosLoading ? 'Loading radio list' : ''}
      setSelected={setSelectedElement}
      isSubmenu
    />
  );
};

export default StationList;
