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

import { useCallback, useEffect } from 'react';
import { useSkeletonMenu } from 'hooks/useSkeletonMenu';
import { MenuPosition, WidgetElement } from 'hooks/useSkeletonMenu/skeletonMenuEnums';
import { registerView, unregisterView } from 'hooks/useViewCommandManager';
import { Command } from 'types/Command';
import { InteractiveGroup, setAllElementsUnselected } from 'components/interactive';

const viewId = 'monitorButtons';
const activeCommands = [Command.ArrowRight, Command.ArrowLeft];
const inactiveCommands = [Command.ArrowDown, Command.ArrowUp];

export const useMonitorButtons = (setActive: (active: boolean) => void, disabled?: boolean) => {
  const { getComponentKey } = useSkeletonMenu();
  const widgetComponentKey = getComponentKey(MenuPosition.WIDGET);
  const focusException = widgetComponentKey === WidgetElement.LEARN_MORE;
  const noFocusException = widgetComponentKey === WidgetElement.SETTINGS;

  useEffect(() => {
    if (InteractiveGroup.hasPriority(activeCommands)) {
      setActive(true);
    }
  }, [setActive]);

  const commandListener = useCallback(
    (command: Command) => {
      if (disabled) {
        return true;
      }

      if (activeCommands.includes(command) && !noFocusException) {
        setAllElementsUnselected();
        setActive(true);
      }

      if (inactiveCommands.includes(command) && !focusException) {
        setActive(false);
      }

      return true;
    },
    [noFocusException, disabled, focusException, setActive]
  );

  useEffect(() => {
    registerView({
      viewId,
      listener: commandListener,
    });

    return () => unregisterView({ viewId });
  }, [commandListener]);
};
