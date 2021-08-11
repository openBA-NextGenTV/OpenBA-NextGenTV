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

import { useCallback } from 'react';

import {
  Menu,
  useSelectMenuChildMutation,
  useSelectMenuMutation,
  useSelectMenuNextMutation,
  useSelectMenuParentMutation,
  useSelectMenuPreviousMutation,
  useSetMenuIsDisableMutation,
  useSetMenuIsVisibleMutation,
  useUnselectMenuItemsMutation,
  useUnselectMenuMutation,
} from '../../apollo/generated/graphql';

export const useMenusOperations = () => {
  const [setMenuIsVisible] = useSetMenuIsVisibleMutation();
  const [setMenuIsDisable] = useSetMenuIsDisableMutation();
  const [selectMenuMutation] = useSelectMenuMutation();
  const [unselectMenuMutation] = useUnselectMenuMutation();
  const [unselectMenuItemsMutation] = useUnselectMenuItemsMutation();
  const [selectMenuNextMutation] = useSelectMenuNextMutation();
  const [selectMenuPreviousMutation] = useSelectMenuPreviousMutation();
  const [selectMenuParentMutation] = useSelectMenuParentMutation();
  const [selectMenuChildMutation] = useSelectMenuChildMutation();

  const showMenu = useCallback(() => setMenuIsVisible({ variables: { menuIsVisible: true } }), [setMenuIsVisible]);

  const hideMenu = useCallback(() => setMenuIsVisible({ variables: { menuIsVisible: false } }), [setMenuIsVisible]);

  const enableMenu = useCallback(() => setMenuIsDisable({ variables: { menuIsDisable: false } }), [setMenuIsDisable]);

  const disableMenu = useCallback(() => setMenuIsDisable({ variables: { menuIsDisable: true } }), [setMenuIsDisable]);

  const selectMenu = useCallback((menuId: Menu['id']) => selectMenuMutation({ variables: { menuId } }), [
    selectMenuMutation,
  ]);

  const unselectMenu = useCallback(() => unselectMenuMutation(), [unselectMenuMutation]);

  const unselectMenuItems = useCallback(() => unselectMenuItemsMutation(), [unselectMenuItemsMutation]);

  const selectMenuNext = useCallback(() => selectMenuNextMutation(), [selectMenuNextMutation]);

  const selectMenuPrevious = useCallback(() => selectMenuPreviousMutation(), [selectMenuPreviousMutation]);

  const selectMenuParent = useCallback(() => selectMenuParentMutation(), [selectMenuParentMutation]);

  const selectMenuChild = useCallback(() => selectMenuChildMutation(), [selectMenuChildMutation]);

  return {
    showMenu,
    hideMenu,
    enableMenu,
    disableMenu,
    selectMenu,
    unselectMenu,
    unselectMenuItems,
    selectMenuNext,
    selectMenuPrevious,
    selectMenuParent,
    selectMenuChild,
  };
};
