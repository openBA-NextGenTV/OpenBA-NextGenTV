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

import { FC, memo } from 'react';
import { useDuration } from 'pages/vod/hooks';
import { FeedCategory, FeedItem } from 'types/Feed';
import { MenuItem } from 'components/skeleton/components/bottomMenu/components/MenuItem';
import { BackgroundImg, Duration, DurationWrapper, MenuItemContent, Title } from './Styles';

interface Props extends FeedItem {
  category: FeedCategory;
  onClick: () => void;
  selected: boolean;
  active?: boolean;
}

const VodItemPure: FC<Props> = ({
  id,
  category,
  selected,
  title,
  thumbnailUrl,
  duration,
  onClick,
  active,
}) => {
  const { min, sec } = useDuration(duration);
  const minutes = min ? `${min}min` : '';
  const seconds = `${sec}sec`;
  const background = thumbnailUrl || `assets/menuBackgrounds/${category}.jpg`;
  const isSelected = selected && active;

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;

    target.onerror = null;
    target.src = `assets/menuBackgrounds/${category}.jpg`;
  };

  return (
    <MenuItem onClick={onClick} selected={isSelected} category={category}>
      <MenuItemContent selected={isSelected} data-test-id={`${category}-item-content-${id}`}>
        <Title selected={isSelected}>{title}</Title>
        {duration && (
          <DurationWrapper>
            <Duration selected={isSelected}>
              {minutes} {seconds}
            </Duration>
          </DurationWrapper>
        )}
      </MenuItemContent>
      <BackgroundImg src={background} onError={onImgError} />
    </MenuItem>
  );
};

export const VodItem = memo(VodItemPure);
