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

import { AlertState } from 'types/Alert';
import { ALERT_CODE_COLOR_MAP, AlertColors, AlertPriorityColors } from './constants';
import { AlertCode, AlertPriority } from './types';

function getAlertBackgroundColor(
  alertCode: AlertCode,
  alertStatus?: AlertState,
  priority?: AlertPriority
) {
  if (alertStatus === AlertState.CANCEL) {
    return AlertColors.GREEN_COLOR;
  }

  if (priority && alertCode === AlertCode.BNA) {
    return AlertPriorityColors[priority];
  }

  return ALERT_CODE_COLOR_MAP[alertCode];
}

function getAlertState(state: AlertState) {
  switch (state) {
    case AlertState.UPDATE:
      return 'updated';
      break;

    case AlertState.NEW:
      return 'new';
      break;

    case AlertState.CANCEL:
      return 'cancelled';

    default:
      return '';
  }
}

export { getAlertBackgroundColor, getAlertState };
