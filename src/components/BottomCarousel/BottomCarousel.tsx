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

import { FC, ReactElement, useRef } from 'react';
import Slider from 'react-slick';
import { useSkeletonMenu } from 'hooks/useSkeletonMenu';
import { MenuPosition, WidgetElement } from 'hooks/useSkeletonMenu/skeletonMenuEnums';
import { IconButton as Icon } from 'components/iconButton';
import {
  InteractiveElement,
  InteractiveGroup,
  InteractiveGroupProps,
} from 'components/interactive';
import { StatusMessage } from 'components/StatusMessage';
import { plugHandler } from 'utils/navigation';
import * as s from './Styles';

interface Props {
  interactiveGroupProps: InteractiveGroupProps;
  items: ReactElement | ReactElement[];
  itemsCount: number;
  isSubmenu?: boolean;
  setSelected?: (index: number) => void;
  statusMessage?: string;
}

export const BottomCarousel: FC<Props> = ({
  statusMessage,
  itemsCount,
  setSelected = () => {},
  interactiveGroupProps,
  items,
  isSubmenu,
}) => {
  const ref = useRef<Slider>(null);
  const hideBlur = itemsCount < s.MAX_ITEMS_IN_ROW;
  const { getComponentKey } = useSkeletonMenu();
  const disabled = getComponentKey(MenuPosition.WIDGET) === WidgetElement.SETTINGS;

  function beforeChange(currentIndex: number, newIndex: number) {
    if (currentIndex >= 0) setSelected(newIndex);
  }

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    variableWidth: true,
    initialSlide: InteractiveGroup.getSavedState(interactiveGroupProps.viewId),
    slidesToScroll: 1,
    speed: 250,
    swipeToSlide: true,
    touchThreshold: 75,
    beforeChange,
  };

  const content = itemsCount ? (
    <s.OverflowWrapper size={itemsCount} hideBlur={hideBlur} isSubmenu={isSubmenu}>
      <Slider ref={ref} {...settings}>
        {items}
      </Slider>
    </s.OverflowWrapper>
  ) : (
    items
  );

  const interactiveElementsPlug =
    Array.isArray(items) &&
    items.map((item) => (
      <InteractiveElement key={item.key} normalElement={null} onClick={plugHandler} />
    ));

  return (
    <s.BottomCarousel
      data-test-id="bottom-carousel-wrapper"
      disabled={disabled}
      isSubmenu={isSubmenu}
    >
      {isSubmenu && <Icon size={70} icon="exit" buttonLabel="Back" transparent />}
      {statusMessage ? <StatusMessage>{statusMessage}</StatusMessage> : content}
      <InteractiveGroup
        {...interactiveGroupProps}
        groupActive={!disabled}
        customHandlerLeft={() => ref.current?.slickPrev()}
        customHandlerRight={() => ref.current?.slickNext()}
      >
        {interactiveElementsPlug}
      </InteractiveGroup>
    </s.BottomCarousel>
  );
};
