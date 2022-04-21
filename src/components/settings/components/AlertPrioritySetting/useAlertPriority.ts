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

import { getLocalStorageItem, setLocalStorageItem } from 'hooks/useLocalStorage';
import { AlertPriority } from 'types/Alert';
import { LocalStorageItems } from 'types/LocalStorage';
import { AlertPrioritySetting, SettingsMap } from './SettingsMap';

export const setAlertPriority = (priority: AlertPriority): void => {
  setLocalStorageItem(LocalStorageItems.ALERT_PRIORITY, priority.toString());
};

export const getAlertPriority = () => {
  const priority: string = getLocalStorageItem(LocalStorageItems.ALERT_PRIORITY);
  const priorityNumber: number = parseInt(priority, 10);

  if (!priority || Number.isNaN(priorityNumber) || !AlertPriority[priorityNumber]) {
    setLocalStorageItem(LocalStorageItems.ALERT_PRIORITY, AlertPriority.HIGH.toString());

    return AlertPriority.HIGH;
  }

  return SettingsMap.findIndex((item: AlertPrioritySetting) => item.priority === priorityNumber);
};
