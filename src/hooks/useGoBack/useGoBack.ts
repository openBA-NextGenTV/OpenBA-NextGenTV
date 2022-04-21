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
import { useNavigate } from 'react-router-dom';
import { ALERT_PRIORITY, ZIPCODE } from 'configs/ineractiveGroupViewId';
import { Command } from 'types/Command';
import { registerView, unregisterView } from '../useViewCommandManager';

const useGoBackViewId = 'useGoBackViewId';

export const useGoBack = () => {
  const navigate = useNavigate();

  const commandListener = useCallback(
    (command: Command) => {
      if (command !== Command.Backspace) {
        return true;
      }

      navigate(-1);

      return true;
    },
    [navigate]
  );

  useEffect(() => {
    registerView({
      viewId: useGoBackViewId,
      listener: commandListener,
      handlesAfterVies: [ZIPCODE, ALERT_PRIORITY],
    });

    return () => unregisterView({ viewId: useGoBackViewId });
  }, [commandListener]);
};
