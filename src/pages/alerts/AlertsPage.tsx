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
import ReactGA from 'react-ga4';
import { useDispatch, useSelector } from 'react-redux';
import { useGoBack } from 'hooks/useGoBack';
import { alertActions, alertSelectors } from 'redux/slices/alerts';
import { deviceSelectors } from 'redux/slices/device';
import { skeletonMenuActions } from 'redux/slices/skeletonMenu';
import { Alert, AlertState } from 'types/Alert';
import { GaAction } from 'types/GA';
import { Message } from 'components/Message';
import { RMPPlaceholder } from 'components/rmpPlaceholder';
import AlertBar from './components/AlertBar';
import { AlertList } from './components/alertList';
import AlertModal from './components/AlertModal';
import { getAlertBackgroundColor } from './service';
import { AlertBarWrapper, ContentWrapper, PageContainer } from './styles';
import { AlertCode } from './types';

function AlertsPage() {
  const selectedAlert = useSelector(alertSelectors.getSelectedAlert);
  const modalAlert = useSelector(alertSelectors.getModalAlert);
  const isInternetConnected = useSelector(deviceSelectors.getNetworkStatus);
  const dispatch = useDispatch();
  const alerts = useSelector(alertSelectors.getAlertsFiltered);

  useEffect(() => {
    ReactGA.event({ category: 'Alert', action: GaAction.Open });
  }, []);

  useEffect(() => {
    dispatch(skeletonMenuActions.setTVElement({ tvElement: null }));
  }, [dispatch]);

  useEffect(() => {
    if (!alerts.includes(selectedAlert)) {
      dispatch(alertActions.selectAlert({ alert: alerts[0] }));
    }
  }, [alerts, dispatch, selectedAlert]);

  useGoBack();

  const alertBarClickHandler = () => {
    ReactGA.event({
      category: 'Alert',
      action: GaAction.Select,
      label: selectedAlert.id,
    });

    if (alerts.length) dispatch(alertActions.openAlertModal());
  };

  const closeModal = () => {
    dispatch(alertActions.closeAlertModal());
  };

  const backgroundColor =
    selectedAlert &&
    getAlertBackgroundColor(
      selectedAlert.eventCode as AlertCode,
      selectedAlert.status,
      selectedAlert.priority
    );

  return (
    <PageContainer>
      <ContentWrapper>
        <RMPPlaceholder alignMenuRight />

        {alerts.length && (
          <AlertList
            handleShowMore={alertBarClickHandler}
            alertsList={alerts}
            selectedAlert={selectedAlert}
            itemSelectedCallback={(alert: Alert) => dispatch(alertActions.selectAlert({ alert }))}
          />
        )}
      </ContentWrapper>

      {alerts.length && selectedAlert ? (
        <AlertBarWrapper color={backgroundColor}>
          <AlertBar
            alertStatus={selectedAlert.status !== AlertState.ALERT ? selectedAlert.status : null}
            alertCode={selectedAlert.eventCode as AlertCode}
            alertText={selectedAlert.title}
            alertUrl={selectedAlert.tinyUrl}
            qrSize={200}
            backgroundColor={backgroundColor}
          />
        </AlertBarWrapper>
      ) : (
        <Message>There are no emergency alerts at this time</Message>
      )}

      {modalAlert && (
        <AlertModal
          handleClose={closeModal}
          alert={modalAlert}
          isInternetConnected={isInternetConnected}
          color={getAlertBackgroundColor(
            modalAlert.eventCode as AlertCode,
            modalAlert.status,
            modalAlert.priority
          )}
        />
      )}
    </PageContainer>
  );
}

export default AlertsPage;
