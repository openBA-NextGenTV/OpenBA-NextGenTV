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

import { useCallback, useEffect } from 'react';

import { Command, registerView, unregisterView } from '../useViewCommandManager';

export type Item = Readonly<{
  label: string;
  payload?: any;
  selected?: boolean;
}>;

export const useController = (
  viewId: string,
  items: Item[],
  onSelect: (item: Item) => void,
  direction: 'vertical' | 'horizontal' = 'vertical',
  isDisable?: boolean,
) => {
  const commandListener = useCallback(
    (command: Command) => {
      switch (command) {
        case 'ArrowUp': {
          if (direction === 'vertical') {
            onSelect(getPreviousItem(items));
          }

          break;
        }
        case 'ArrowDown': {
          if (direction === 'vertical') {
            onSelect(getNextItem(items));
          }

          break;
        }
        case 'ArrowLeft': {
          if (direction === 'horizontal') {
            onSelect(getPreviousItem(items));
          }

          break;
        }
        case 'ArrowRight': {
          if (direction === 'horizontal') {
            onSelect(getNextItem(items));
          }

          break;
        }
      }

      return true;
    },
    [items, onSelect, direction],
  );

  useEffect(() => {
    const id = viewId + 'Controller';
    if (isDisable) {
      unregisterView({ viewId: id });
    } else {
      registerView({ viewId: id, listener: commandListener });
    }

    return () => unregisterView({ viewId: id });
  }, [viewId, commandListener, isDisable]);
};

const getNextItem = (items: Item[]) => {
  const selectedIndex = items.findIndex(value => value.selected);
  let nextIndex;

  if (selectedIndex === -1) {
    nextIndex = 0;
  } else {
    nextIndex = selectedIndex === items.length - 1 ? 0 : selectedIndex + 1;
  }

  return items[nextIndex];
};

const getPreviousItem = (items: Item[]) => {
  const selectedIndex = items.findIndex(value => value.selected);
  let nextIndex;

  if (selectedIndex === -1) {
    nextIndex = 0;
  } else {
    nextIndex = selectedIndex === 0 ? items.length - 1 : selectedIndex - 1;
  }

  return items[nextIndex];
};
