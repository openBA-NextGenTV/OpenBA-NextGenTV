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

import { RefObject, useCallback, useEffect } from 'react';

import { useWidgetOperations } from '../../state';
import { Command, registerView, unregisterView } from '../useViewCommandManager';

export const useCommandScroll = (elementRef: RefObject<HTMLDivElement>, VIEW_ID: string) => {
  const { closeWidget } = useWidgetOperations();

  const commandListener = useCallback(
    (command: Command) => {
      let currentScroll = elementRef.current?.scrollTop || 0;

      const scrollElementTo = () => {
        elementRef.current?.scrollTo({
          top: currentScroll,
          behavior: 'smooth',
        });
      };

      if (command === 'Backspace' || command === 'ArrowLeft' || command === 'ArrowRight' || command === 'Enter') {
        closeWidget();
      } else if (command === 'ArrowUp') {
        currentScroll = currentScroll >= 100 ? (currentScroll -= 100) : 0;

        scrollElementTo();
      } else if (command === 'ArrowDown') {
        currentScroll += 100;

        scrollElementTo();
      }
    },
    [elementRef, closeWidget],
  );

  useEffect(() => {
    registerView({ viewId: VIEW_ID, listener: commandListener });

    return () => unregisterView({ viewId: VIEW_ID });
  }, [VIEW_ID, commandListener]);
};
