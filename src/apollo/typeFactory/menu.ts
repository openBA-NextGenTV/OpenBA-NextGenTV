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

import { Menu } from '../generated/graphql';
import { addType } from './utils';

export const createMenu = ({
  id,
  titleImage,
  title,
  titleHidden,
  subTitle,
  showTime,
  headerImage,
  footerImage,
  items = [],
  selected,
  thumbnail,
  widget,
  noItemsText,
  hidden,
}: Pick<
  Menu,
  | 'id'
  | 'titleImage'
  | 'title'
  | 'titleHidden'
  | 'subTitle'
  | 'showTime'
  | 'headerImage'
  | 'footerImage'
  | 'items'
  | 'selected'
  | 'thumbnail'
  | 'widget'
  | 'noItemsText'
  | 'hidden'
>): Menu => {
  const result: Menu = {
    id,
    titleImage: titleImage || null,
    title,
    titleHidden: titleHidden || false,
    subTitle: subTitle || null,
    showTime: showTime || null,
    headerImage: headerImage || null,
    footerImage: footerImage || null,
    thumbnail: thumbnail || null,
    widget: widget || null,
    items,
    selected: selected || null,
    noItemsText: noItemsText || null,
    hidden: hidden || null,
  };

  addType(result, 'Menu');

  return result;
};
