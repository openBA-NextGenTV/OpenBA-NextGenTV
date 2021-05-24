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

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useCommandScroll } from '../../../../hooks';
import { useMenusOperations, useWidgetOperations } from '../../../../state';
import { ArrowBack } from '../common';
import { usePrivacyPolicyData } from './hooks';
import { BottomText, Container, ScrollContainer, Title } from './Styles';

export const PrivacyPolicy = () => {
  const { closeWidget } = useWidgetOperations();
  const { privacyPolicy } = usePrivacyPolicyData();
  const policyRef = useRef<HTMLDivElement>(null);
  const { selectMenu } = useMenusOperations();
  const { t } = useTranslation();

  useCommandScroll(policyRef, 'PrivacyPolicyId');

  const handleClickBack = () => {
    closeWidget();
    selectMenu('settings');
  };

  return (
    <Container>
      <ArrowBack
        title={t('menu.settings')}
        titleMobile={t('menu.settings')}
        handleClick={handleClickBack}
        forceArrowVisible
      />

      <Title>Privacy Policy</Title>

      <ScrollContainer
        onDoubleClick={closeWidget}
        ref={policyRef}
        dangerouslySetInnerHTML={{
          __html: privacyPolicy,
        }}
      />
      <BottomText>Press OK / Back / Left / Right to Skip page</BottomText>
    </Container>
  );
};
