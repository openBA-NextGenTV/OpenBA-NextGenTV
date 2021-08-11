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

import { useEffect } from 'react';
import { Maybe } from 'src/apollo/generated/graphql';
import { useDeviceInfoModel, useMenusOperations, useWidgetOperations } from 'src/state';
import { useOtaRadioOperations } from 'src/state/useOtaRadio';

import { acquireService } from '../../../../hooks';

export const Radio = ({ widget: { payload } }: { widget: { payload?: Maybe<string> | undefined } }) => {
  const { closeWidget } = useWidgetOperations();
  const { hideMenu } = useMenusOperations();
  const [setStation] = useOtaRadioOperations();
  const { station } = useDeviceInfoModel();

  useEffect(() => {
    if (!payload) {
      return;
    }

    setStation(station);
    acquireService(JSON.parse(payload)?.globalServiceID);
    hideMenu();
    closeWidget();
  });

  return <></>;
};
