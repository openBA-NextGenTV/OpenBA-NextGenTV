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

import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { registerView, unregisterView } from '../../../../hooks';
import { useDeviceInfoModel, useMenusOperations, useWidgetOperations } from '../../../../state';
import { Container } from '../common';
import { Property } from './property';
import { useCurrentTime } from './useCurrentTime';

export const SystemInfo = () => {
  const { t } = useTranslation();
  const { deviceId, serviceId, buildVersion, appVersion } = useDeviceInfoModel();
  const { currentTime } = useCurrentTime();
  const { selectMenu } = useMenusOperations();
  const { closeWidget } = useWidgetOperations();

  const commandListener = useCallback(() => {
    closeWidget();
    return true;
  }, [closeWidget]);

  useEffect(() => {
    registerView({ viewId: 'SystemInfo', listener: commandListener });

    return () => unregisterView({ viewId: 'SystemInfo' });
  }, [commandListener]);

  const handleBackClick = () => {
    selectMenu('settings');
    closeWidget();
  };

  return (
    <Container title="System Info" titleMobile={t('menu.settings')} handleClick={handleBackClick}>
      <Property label="IoT Client:" value={deviceId} />
      <Property label="Local UTC:" value={currentTime} />
      <Property label="Service Id:" value={serviceId} />
      <Property label="User Agent:" value={navigator.userAgent} />
      <Property label="App Location:" value={window.location.href} />
      <Property label="App Version:" value={appVersion} />
      <Property label="App Build:" value={buildVersion} />
    </Container>
  );
};
