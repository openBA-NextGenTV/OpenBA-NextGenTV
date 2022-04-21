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

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ZIP_WILDCARD } from 'configs/wildCards';
import { userSettingsActions } from 'redux/slices/userSettings';
import { AlertPriority } from 'types/Alert';
import { LocalStorageItems } from 'types/LocalStorage';

export const getLocalStorageItem = (key: LocalStorageItems) => localStorage[key];

export const setLocalStorageItem = (key: LocalStorageItems, value: string): void => {
  localStorage.setItem(key, value);
};

export const useLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userSettingsActions.setAlertPriority({
        alertPriority: getLocalStorageItem(LocalStorageItems.ALERT_PRIORITY) || AlertPriority.HIGH,
      })
    );

    const zipCode = getLocalStorageItem(LocalStorageItems.ZIPCODE);
    const zipCodeParsed = JSON.parse(zipCode || '[]').join('') || ZIP_WILDCARD;

    dispatch(
      userSettingsActions.setZip({
        zip: zipCodeParsed,
      })
    );
  }, [dispatch]);
};
