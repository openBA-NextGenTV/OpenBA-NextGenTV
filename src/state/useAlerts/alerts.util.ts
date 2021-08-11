/*
 * Copyright 2021 OpenBA-NextGenTV Contributors (https://OpenBA-NextGenTV.tech)
 * Copyright 2021 Sinclair Broadcast Group, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Alert, Priority } from '../../apollo/generated/graphql';

export const alertFilter = (alert: Alert, fips: string | null, priority?: Priority | undefined) => {
  if (Date.now() > alert.expire) {
    return false;
  }

  if (priority) {
    if (priority === Priority.NoAlerts) {
      return false;
    }

    if (priority === Priority.Diagnostic) {
      return true;
    }

    const alertPriority = priorityToNumberMap[alert.priority];
    const savedPriority = priorityToNumberMap[priority];

    if (alertPriority < savedPriority) {
      return false;
    }
  }

  return isAcceptableByFips(alert.targets, fips);
};

const isAcceptableByFips = (incomingAlertFips: string[], fips: string | null) => {
  const acceptableFips = ['target:fips:*', 'target:fips:000000'];

  if (fips) {
    acceptableFips.push(`target:fips:${fips}`);
  }

  return incomingAlertFips.some(incomingFips => acceptableFips.includes(incomingFips));
};

export const isUpdatedAlert = (existingAlert: Alert, newAlert: Alert) =>
  existingAlert.id === newAlert.id && existingAlert.latestPublishTime < newAlert.latestPublishTime;

const priorityToNumberMap: { [key: string]: number } = {
  EMERGENCY: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
  NO_ALERTS: 0,
  DIAGNOSTIC: -1,
};

export const sortByPriority = (a: Alert['priority'], b: Alert['priority']) => {
  const aInt = priorityToNumberMap[a];
  const bInt = priorityToNumberMap[b];
  return bInt - aInt;
};

export const getPriorityByNumber = (priorityNumber: number) => {
  const keys = Object.keys(priorityToNumberMap);

  return keys.find(key => priorityToNumberMap[key] === priorityNumber);
};
