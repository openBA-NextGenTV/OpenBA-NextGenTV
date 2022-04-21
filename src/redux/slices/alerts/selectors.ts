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

import { createSelector } from 'reselect';
import { Alert } from 'types/Alert';
import { InitialState as AppConfigState } from '../appConfig/reducer';
import { InitialState as UserSettingsState, userSettingsSelectors } from '../userSettings';
import { InitialState } from './reducer';
import { alertFilter } from './utils';

interface State {
  alert: InitialState;
  appConfig: AppConfigState;
  userSettings: UserSettingsState;
}

const getState = (state: State) => state.alert;

export const getAlerts = (state: State) => getState(state).value.alerts;

export const getAlertsFiltered = createSelector(
  getAlerts,
  userSettingsSelectors.getAlertPriority,
  userSettingsSelectors.getFips,
  (alerts, priority, fips) => alerts.filter((a) => alertFilter(a, fips, priority))
);

export const getSelectedAlert = (state: State) => {
  const selectedID = getState(state).value.selectedAlertId;

  return getState(state).value.alerts.find((alert: Alert) => alert.id === selectedID) as Alert;
};

export const getModalAlert = (state: State) => {
  const { modalAlertId } = getState(state).value;

  return getState(state).value.alerts.find((alert: Alert) => alert.id === modalAlertId) as Alert;
};
