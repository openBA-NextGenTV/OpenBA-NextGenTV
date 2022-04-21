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

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VOD_LIST } from 'configs/ineractiveGroupViewId';
import { useSkeletonMenu } from 'hooks/useSkeletonMenu';
import { MenuPosition, WidgetElement } from 'hooks/useSkeletonMenu/skeletonMenuEnums';
import { useTogglePlayer } from 'hooks/useTogglePlayer';
import { useLatestWeathercastFetch } from 'hooks/useWeather';
import { categoryToTitleMap } from 'pages/menu/components/feeds/components/menuItem/MenuItemsConfig';
import { deviceSelectors } from 'redux/slices/device';
import { feedsSelectors } from 'redux/slices/feeds';
import { skeletonMenuActions } from 'redux/slices/skeletonMenu';
import { getTVElement } from 'redux/slices/skeletonMenu/selectors';
import { Command } from 'types/Command';
import { Feed, FeedCategory, FeedItem } from 'types/Feed';
import { BottomCarousel } from 'components/BottomCarousel';
import { useMonitorButtons } from 'components/BottomCarousel/useMonitorButtons';
import { Message } from 'components/Message/Styles';
import { VideoPlayer } from 'components/player';
import { VodItem } from './components/vodItem';
import {
  findActiveElement,
  getEmptyMessage,
  getFeedsWithWeather,
  getLoadingMassage,
} from './service';
import { MessageContainer } from './styles';

const handleCommands = [Command.ArrowLeft, Command.ArrowRight, Command.Enter];

interface Props {
  categoryID: FeedCategory;
}

export const VodList: FC<Props> = ({ categoryID }) => {
  const feeds = useSelector(feedsSelectors.getFeeds);
  const loading = useSelector(feedsSelectors.getFeedsLoading);
  const isInternetConnected = useSelector(deviceSelectors.getNetworkStatus);
  const { latestWeathercast, latestWeathercastLoading } = useLatestWeathercastFetch();
  const feedsWithWeather = getFeedsWithWeather(feeds, latestWeathercast?.videoUrl);
  const data = feedsWithWeather?.find((feed: Feed) => feed.id === categoryID) as Feed;
  const tvElementURL = useSelector(getTVElement)?.props?.url;
  const { getComponentKey } = useSkeletonMenu();
  const widgetElementKey = getComponentKey(MenuPosition.WIDGET);
  const { isActivePlayer, setActivePlayer } = useTogglePlayer(Boolean(tvElementURL));

  const [activeElement, setActiveElement] = useState<FeedItem | null>(
    findActiveElement(data, tvElementURL)
  );

  const [bottomMenuActive, setBottomMenuActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const setTvElement =
      isActivePlayer && activeElement ? (
        <VideoPlayer
          url={activeElement?.videoUrl}
          controlsDisabled={
            selectedElement !== activeElement?.index || widgetElementKey === WidgetElement.SETTINGS
          }
          title={activeElement?.title}
          category={categoryToTitleMap[categoryID]}
        />
      ) : null;

    dispatch(skeletonMenuActions.setTVElement({ tvElement: setTvElement }));
  }, [isActivePlayer, selectedElement, dispatch, activeElement, widgetElementKey, categoryID]);

  const handleActiveElement = useCallback(
    (vod: FeedItem) => {
      setActiveElement(vod);
      setActivePlayer(true);
    },
    [setActiveElement, setActivePlayer]
  );

  useMonitorButtons(setBottomMenuActive);

  const customEnterHandler = useCallback(
    () => data && handleActiveElement({ ...data.items[selectedElement], index: selectedElement }),
    [data, handleActiveElement, selectedElement]
  );

  const contentToRenderMemorized = useMemo(() => {
    if (!data?.items?.length)
      return (
        <MessageContainer>
          <Message>{getEmptyMessage(categoryToTitleMap[categoryID])}</Message>
        </MessageContainer>
      );

    return data.items.map((item, index) => (
      <VodItem
        onClick={() => {
          setSelectedElement(index);
          handleActiveElement({ ...item, index });
        }}
        {...item}
        key={item.id}
        category={data.id}
        selected={selectedElement === index}
        active={bottomMenuActive}
      />
    ));
  }, [bottomMenuActive, categoryID, data, handleActiveElement, selectedElement]);

  const statusMessage = getLoadingMassage(
    categoryID,
    loading || latestWeathercastLoading,
    isInternetConnected
  );

  const interactiveGroupProps = {
    viewId: VOD_LIST(categoryID),
    handleCommands,
    initialHighlight: true,
    setSavedIndex: setSelectedElement,
    customEnterHandler,
  };

  return (
    <BottomCarousel
      interactiveGroupProps={interactiveGroupProps}
      itemsCount={data?.items?.length}
      statusMessage={statusMessage}
      items={contentToRenderMemorized}
      setSelected={setSelectedElement}
      isSubmenu
    />
  );
};
