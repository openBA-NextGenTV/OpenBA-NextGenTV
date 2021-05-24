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

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFipsModel, useFipsOperations, useMenusOperations, useWidgetOperations } from '../../../../state';
import { Container } from '../common';
import { ContentContainer, Input } from './Fips.styles';
import { Keyboard } from './keyboard';

const FIPS_LENGTH = 6;

export const Fips = () => {
  const { fipsCode, setFipsCode, updateFips } = useFips();
  const { t } = useTranslation();
  const { closeWidget } = useWidgetOperations();
  const { unselectMenu } = useMenusOperations();

  const onDigitClick = (digit: string) => {
    if (fipsCode.length === FIPS_LENGTH) {
      return;
    }

    setFipsCode(prevState => prevState + digit);
  };

  const onDeleteClick = () => setFipsCode(fipsCode.slice(0, -1));

  const onOkClick = () => updateFips(fipsCode);

  const handleBackClick = () => {
    closeWidget();
    unselectMenu();
  };

  return (
    <Container title="FIPS Code" titleMobile={t('menu.settings')} handleClick={handleBackClick}>
      <ContentContainer>
        <Input type="text" value={fipsCode} readOnly />

        <Keyboard
          okDisabled={fipsCode.length > 0 && fipsCode.length < FIPS_LENGTH}
          delDisabled={fipsCode.length === 0}
          onDigitClick={onDigitClick}
          onOkClick={onOkClick}
          onDeleteClick={onDeleteClick}
        />
      </ContentContainer>
    </Container>
  );
};

const useFips = () => {
  const [fipsCode, setFipsCode] = useState('');
  const { updateFips } = useFipsOperations();
  const { fips } = useFipsModel();

  useEffect(() => {
    setFipsCode(fips);
  }, [fips]);

  return {
    fipsCode,
    setFipsCode,
    updateFips,
  };
};
