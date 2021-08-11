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

import { gql } from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SET_MENU_IS_VISIBLE = gql`
  mutation setMenuIsVisible($menuIsVisible: Boolean) {
    setMenuIsVisible(menuIsVisible: $menuIsVisible) @client
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_MENU_IS_VISIBLE = gql`
  query getMenuIsVisible {
    menuIsVisible @client
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SET_MENU_IS_DISABLE = gql`
  mutation setMenuIsDisable($menuIsDisable: Boolean) {
    setMenuIsDisable(menuIsDisable: $menuIsDisable) @client
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_MENU_IS_DISABLE = gql`
  query getMenuIsDisable {
    menuIsDisable @client
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_MENU = gql`
  query getMenu {
    menu @client {
      id
      titleImage
      title
      titleHidden
      subTitle
      showTime
      headerImage
      footerImage
      thumbnail
      widget {
        id
        type
        payload
        metric {
          page
          title
        }
      }
      selected
      hidden
      items {
        id
        titleImage
        title
        titleHidden
        subTitle
        showTime
        headerImage
        footerImage
        thumbnail
        noItemsText
        widget {
          id
          type
          payload
          metric {
            page
            title
          }
        }
        selected
        hidden
        items {
          id
          titleImage
          title
          titleHidden
          subTitle
          showTime
          headerImage
          footerImage
          thumbnail
          widget {
            id
            type
            payload
            metric {
              page
              title
            }
          }
          selected
          hidden
          items {
            id
            titleImage
            title
            titleHidden
            subTitle
            showTime
            headerImage
            footerImage
            thumbnail
            widget {
              id
              type
              payload
              metric {
                page
                title
              }
            }
            selected
            hidden
          }
        }
      }
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SELECT_MENU = gql`
  mutation selectMenu($menuId: ID!) {
    selectMenu(menuId: $menuId) @client {
      __typename
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UNSELECT_MENU = gql`
  mutation unselectMenu($menuId: ID!) {
    unselectMenu(menuId: $menuId) @client {
      __typename
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UNSELECT_MENU_ITEMS = gql`
  mutation unselectMenuItems {
    unselectMenuItems @client {
      __typename
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SELECT_MENU_NEXT = gql`
  mutation selectMenuNext {
    selectMenuNext @client {
      __typename
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SELECT_MENU_PREVIOUS = gql`
  mutation selectMenuPrevious {
    selectMenuPrevious @client {
      __typename
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SELECT_MENU_PARENT = gql`
  mutation selectMenuParent {
    selectMenuParent @client {
      __typename
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SELECT_MENU_CHILD = gql`
  mutation selectMenuChild {
    selectMenuChild @client {
      __typename
    }
  }
`;
