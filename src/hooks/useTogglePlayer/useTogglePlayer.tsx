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

import { useCallback, useEffect, useState } from 'react';
import { PLAYER } from 'configs/ineractiveGroupViewId';
import { registerView, unregisterView } from 'hooks/useViewCommandManager';
import { Command } from 'types/Command';

const viewId = 'useStopForecast';
const useGoBackViewId = 'useGoBackViewId';

export const useTogglePlayer = (initialState?: boolean) => {
  const [mountURL] = useState(window.location.hash);
  const [isActivePlayer, setActivePlayer] = useState(initialState);

  const commandListener = useCallback(
    (command: Command) => {
      if (command !== Command.Backspace || mountURL !== window.location.hash) {
        return true;
      }

      if (isActivePlayer) {
        setActivePlayer(false);
      }

      return !isActivePlayer;
    },
    [isActivePlayer, mountURL]
  );

  useEffect(() => {
    registerView({
      viewId,
      listener: commandListener,
      handlesAfterVies: [PLAYER, useGoBackViewId],
    });

    return () => unregisterView({ viewId });
  }, [commandListener]);

  return { isActivePlayer, setActivePlayer };
};
