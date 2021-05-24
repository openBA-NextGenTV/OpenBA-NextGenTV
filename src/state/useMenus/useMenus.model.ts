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

import { Menu, useGetMenuIsVisibleQuery, useGetMenuQuery } from '../../apollo/generated/graphql';

export const useMenusModel = () => {
  const { data: isVisibleData } = useGetMenuIsVisibleQuery();
  const isVisible = isVisibleData?.menuIsVisible || false;

  const { data: menuData } = useGetMenuQuery();
  const menus = menuData ? makeMenus(menuData.menu, []) : [];

  return {
    menus,
    isVisible,
  };
};

const makeMenus = (menu: Menu, result: Menu[]): Menu[] => {
  result.push(menu);

  const selectedItem = menu.items?.find(item => item.selected);

  if (selectedItem && selectedItem.items) {
    makeMenus(selectedItem, result);
  }

  return result;
};
