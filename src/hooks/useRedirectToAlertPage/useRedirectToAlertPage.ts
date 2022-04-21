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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { alertActions, alertSelectors } from 'redux/slices/alerts';
import { getFileViewerActive } from 'redux/slices/fileList';
import { ALERTS } from 'routes';
import { LocalStorageItems } from 'types/LocalStorage';
import { getLocalStorageItem, setLocalStorageItem } from '../useLocalStorage';

export const useRedirectToAlertPage = () => {
  const navigate = useNavigate();
  const alerts = useSelector(alertSelectors.getAlertsFiltered);
  const dispatch = useDispatch();
  const fileViewerActive = useSelector(getFileViewerActive);

  useEffect(() => {
    if (alerts.length <= 0) return;

    const latestShowedAlert =
      getLocalStorageItem(LocalStorageItems.LAST_SHOWED_ALERT_PUBLISH_TIME) || 0;

    if (alerts[0].latestPublishTime > latestShowedAlert) {
      setLocalStorageItem(
        LocalStorageItems.LAST_SHOWED_ALERT_PUBLISH_TIME,
        alerts[0].latestPublishTime.toString()
      );

      dispatch(alertActions.selectAlert({ alert: alerts[0] }));

      if (!window.location.hash.includes(ALERTS) && !fileViewerActive) {
        navigate(ALERTS);
      }
    }
  }, [alerts, dispatch, navigate, fileViewerActive]);
};
