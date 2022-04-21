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

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'hooks/useInterval';
import { alertActions, alertSelectors } from 'redux/slices/alerts';
import { appConfigSelectors } from 'redux/slices/appConfig';
import { getBaseURI } from 'redux/slices/device/selectors';
import { rpcClient } from 'services/websocket';

export const useInitAlertFetch = () => {
  const MINIMAL_FETCH_NRT_INTERVAL = 5000;
  const CLEAN_UP_INTERVAL = 60000;
  const dispatch = useDispatch();
  const alerts = useSelector(alertSelectors.getAlerts);
  const preferAEAT = useSelector(appConfigSelectors.getPreferAEATMessages);
  const baseURI = useSelector(getBaseURI);
  const fetchNrtInterval = useSelector(appConfigSelectors.getGetNrtInterval);
  const preferAEATMessagesDemo = useSelector(appConfigSelectors.getPreferAEATMessagesDemo);
  const needFirstUpdate = useRef(true);

  const { getAEATAsync, updateAlertsFromAEAT, getAlertsAsync, getAlertNRT, removeExpiredAlerts } =
    alertActions;

  useEffect(() => {
    if (!preferAEAT) {
      dispatch(getAlertsAsync(baseURI));

      return;
    }

    if (rpcClient) {
      rpcClient.onReOpen = () => {
        rpcClient?.call('org.atsc.subscribe', { msgType: ['alertingChange'] });
      };
    }

    rpcClient?.call('org.atsc.subscribe', { msgType: ['alertingChange'] });

    rpcClient?.addListener('org.atsc.notify', (aeat) => {
      dispatch(
        updateAlertsFromAEAT({
          ...aeat,
          preferAEATMessagesDemo,
        })
      );
    });

    dispatch(getAEATAsync(preferAEATMessagesDemo));
  }, [
    dispatch,
    getAEATAsync,
    getAlertsAsync,
    preferAEAT,
    preferAEATMessagesDemo,
    updateAlertsFromAEAT,
    baseURI,
  ]);

  useEffect(() => {
    if (preferAEAT && alerts.length && needFirstUpdate.current) {
      alerts?.forEach((alert) => {
        dispatch(getAlertNRT({ alertId: alert.id, baseURI }));
        needFirstUpdate.current = false;
      });
    }
  }, [dispatch, preferAEAT, needFirstUpdate, alerts, getAlertNRT, baseURI]);

  useInterval(
    () => {
      if (preferAEAT) {
        alerts?.forEach((alert) => {
          dispatch(getAlertNRT({ alertId: alert.id, baseURI }));
        });
      } else {
        dispatch(getAlertsAsync(baseURI));
      }
    },
    fetchNrtInterval > MINIMAL_FETCH_NRT_INTERVAL ? fetchNrtInterval : MINIMAL_FETCH_NRT_INTERVAL
  );

  useInterval(() => {
    dispatch(removeExpiredAlerts());
  }, CLEAN_UP_INTERVAL);
};
