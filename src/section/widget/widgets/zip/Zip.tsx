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

import { useMenusOperations, useWidgetOperations, useZipModel, useZipOperations } from '../../../../state';
import { Container } from '../common';
import { Keyboard } from './keyboard';
import { ContentContainer, Input } from './Styles';

const ZIP_LENGTH = 5;

export const Zip = () => {
  const { zipCode, setZipCode, updateZip } = useZip();
  const { t } = useTranslation();
  const { closeWidget } = useWidgetOperations();
  const { unselectMenu } = useMenusOperations();

  const onDigitClick = (digit: string) => {
    if (zipCode.length === ZIP_LENGTH) {
      return;
    }

    setZipCode(prevState => prevState + digit);
  };

  const onDeleteClick = () => setZipCode(zipCode.slice(0, -1));

  const onOkClick = () => updateZip(zipCode);

  const handleBackClick = () => {
    closeWidget();
    unselectMenu();
  };

  return (
    <Container title="Zip Code" titleMobile={t('menu.settings')} handleClick={handleBackClick}>
      <ContentContainer>
        <Input type="text" value={zipCode} readOnly />

        <Keyboard
          okDisabled={zipCode.length > 0 && zipCode.length < ZIP_LENGTH}
          delDisabled={zipCode.length === 0}
          onDigitClick={onDigitClick}
          onOkClick={onOkClick}
          onDeleteClick={onDeleteClick}
        />
      </ContentContainer>
    </Container>
  );
};

const useZip = () => {
  const [zipCode, setZipCode] = useState('');
  const { updateZip } = useZipOperations();
  const { zip } = useZipModel();

  useEffect(() => {
    setZipCode(zip);
  }, [zip]);

  return {
    zipCode,
    setZipCode,
    updateZip,
  };
};
