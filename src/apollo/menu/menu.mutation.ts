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

import { ApolloClient, gql, Resolvers } from '@apollo/client';

import { isDesktop, isMobile } from '../../utils';
import {
  GetMenuDocument,
  GetMenuIsVisibleDocument,
  GetMenuIsVisibleQuery,
  GetMenuQuery,
  GetWidgetDocument,
  Menu,
} from '../generated/graphql';

export const menuMutation: Resolvers = {
  Mutation: {
    setMenuIsVisible(_, { menuIsVisible }, { cache }) {
      cache.writeQuery({ query: GetMenuIsVisibleDocument, data: { menuIsVisible } });
    },

    selectMenu: (_, { menuId }, { cache }) => {
      const { menu } = cache.readQuery({ query: GetMenuDocument }) as GetMenuQuery;
      unselectMenus(menu, cache);
      selectMenu(menu, cache, menuId);
    },

    unselectMenu: (_, variables, { cache }) => {
      const { menu } = cache.readQuery({ query: GetMenuDocument }) as GetMenuQuery;
      unselectMenus(menu, cache);

      const result: GetMenuQuery['menu'][] = [];
      getSelectedMenus(menu, result);

      result.pop();
      const lastMenu = result.pop();

      if (lastMenu) {
        selectMenu(menu, cache, lastMenu.id);
      }
    },

    unselectMenuItems: (_, args, { cache }) => {
      const { menu } = cache.readQuery({ query: GetMenuDocument }) as GetMenuQuery;
      unselectMenus(menu, cache);
    },

    selectMenuNext(_, args, { cache }) {
      const { menu } = cache.readQuery({ query: GetMenuDocument }) as GetMenuQuery;

      unselectMenus(menu, cache);

      const result: GetMenuQuery['menu'][] = [];
      getSelectedMenus(menu, result);

      const lastMenu = result.pop();
      const parentMenu = result.pop();

      if (lastMenu && parentMenu) {
        const items = parentMenu.items || [];

        const selectedIndex = items.indexOf(lastMenu);
        const nextIndex = selectedIndex === items.length - 1 ? 0 : selectedIndex + 1;

        unselectMenus(menu, cache);
        selectMenu(menu, cache, items[nextIndex].id);
      }
    },

    selectMenuPrevious(_, args, { cache }) {
      const { menu } = cache.readQuery({ query: GetMenuDocument }) as GetMenuQuery;

      unselectMenus(menu, cache);

      const result: GetMenuQuery['menu'][] = [];
      getSelectedMenus(menu, result);

      const lastMenu = result.pop();
      const parentMenu = result.pop();

      if (lastMenu && parentMenu) {
        const items = parentMenu.items || [];

        const selectedIndex = items.indexOf(lastMenu);
        const nextIndex = selectedIndex === 0 ? items.length - 1 : selectedIndex - 1;

        unselectMenus(menu, cache);
        selectMenu(menu, cache, items[nextIndex].id);
      }
    },

    selectMenuParent(_, args, { cache }) {
      const { menu } = cache.readQuery({ query: GetMenuDocument }) as GetMenuQuery;

      const isMenuHasSelectedItem = menu?.items?.some(item => item.selected === true);

      const result: GetMenuQuery['menu'][] = [];
      getSelectedMenus(menu, result);

      result.pop();
      const parentMenu = result.pop();

      if (isMobile() && isMenuHasSelectedItem) {
        unselectMenus(menu, cache);
      } else if (!parentMenu || parentMenu?.title === '') {
        cache.writeQuery({ query: GetMenuIsVisibleDocument, data: { menuIsVisible: false } });
      } else {
        unselectMenus(menu, cache);

        const result: GetMenuQuery['menu'][] = [];
        getSelectedMenus(menu, result);

        result.pop();
        const lastMenu = result.pop();

        if (lastMenu) {
          selectMenu(menu, cache, lastMenu.id);
        }
      }
    },

    selectMenuChild(_, args, { cache }) {
      const { menu } = cache.readQuery({ query: GetMenuDocument }) as GetMenuQuery;
      const { menuIsVisible } = cache.readQuery({ query: GetMenuIsVisibleDocument }) as GetMenuIsVisibleQuery;

      const result: GetMenuQuery['menu'][] = [];
      getSelectedMenus(menu, result);
      const selectedMenu = result.pop();

      if (menuIsVisible && selectedMenu) {
        if (selectedMenu.id === 'menu_logo') {
          cache.writeQuery({
            query: GetWidgetDocument,
            data: { widget: null },
          });
        } else if (selectedMenu.items?.length) {
          const result: GetMenuQuery['menu'][] = [];
          getSelectedMenus(menu, result);

          const lastMenu = result.pop();

          if (lastMenu && lastMenu.items?.length) {
            selectMenu(menu, cache, lastMenu.items[0].id);
          }
        } else if (selectedMenu.widget) {
          const selectedWidgetData = cache.readQuery({
            query: GetWidgetDocument,
          });

          // go to fullscreen mode if some widget is already opened
          if (selectedWidgetData?.widget?.id === selectedMenu.widget.id) {
            cache.writeQuery({ query: GetMenuIsVisibleDocument, data: { menuIsVisible: false } });
          } else {
            cache.writeQuery({
              query: GetWidgetDocument,
              data: { widget: selectedMenu.widget },
            });
          }
        }
      } else {
        cache.writeQuery({ query: GetMenuIsVisibleDocument, data: { menuIsVisible: true } });

        // select the first menu after logo if the alerts (it's selected by default was excluded by feature flag).
        // could be refactored to make this logic more generic
        if (selectedMenu?.id === 'menu_root' && isDesktop() && menu.items) {
          const firstMenuAfterLogo = menu.items.find(value => value.id !== 'menu_logo');

          if (firstMenuAfterLogo) {
            selectMenu(menu, cache, firstMenuAfterLogo.id);
          }
        }
      }
    },
  },
};

const getSelectedMenus = (menu: GetMenuQuery['menu'], result: GetMenuQuery['menu'][]) => {
  if (menu.selected) {
    result.push(menu);

    menu.items?.forEach(value => getSelectedMenus(value, result));
  }
};

const unselectMenus = (menu: GetMenuQuery['menu'], cache: ApolloClient<any>) => {
  const result: GetMenuQuery['menu'][] = [];
  getSelectedMenus(menu, result);

  result.forEach(({ id }) => writeMenuSelect(cache, id, false));
};

const selectMenu = (menu: GetMenuQuery['menu'], cache: ApolloClient<any>, menuId: Menu['id']) => {
  const result: GetMenuQuery['menu'][] = [];
  getMenus(menu, null, result, menuId);

  result.forEach(({ id }) => writeMenuSelect(cache, id, true));

  const selectedMenu = result[result.length - 1];

  if (
    selectedMenu.widget?.type &&
    ['videoPlayer', 'audioPlayer', 'latestWeathercast', 'sevenDayForecast'].includes(selectedMenu.widget?.type)
  ) {
    cache.writeQuery({
      query: GetWidgetDocument,
      data: {
        widget: selectedMenu.widget,
      },
    });
  }
};

const writeMenuSelect = (cache: ApolloClient<any>, menuId: Menu['id'], selected: boolean) =>
  cache.writeFragment({
    id: `Menu:${menuId}`,
    fragment: gql`
      fragment menu on Menu {
        selected
      }
    `,
    data: {
      selected,
    },
  });

const getMenus = (
  menu: GetMenuQuery['menu'],
  parent: GetMenuQuery['menu'] | null,
  result: GetMenuQuery['menu'][],
  menuId: Menu['id'],
) => {
  result.push(menu);

  if (menu.id === menuId) {
    result.push(menu);
    return true;
  } else {
    if (menu.items) {
      for (const obj of menu.items) {
        const found = getMenus(obj, menu, result, menuId);

        if (found) {
          break;
        } else {
          result.pop();
        }
      }
    }
  }

  return false;
};
