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

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Priority as PriorityEnum } from '../../../../apollo/generated/graphql';
import { Item, useController } from '../../../../hooks';
import { useMenusOperations, usePriorityModel, usePriorityOperations, useWidgetOperations } from '../../../../state';
import { Container } from '../common';
import { useCommandListener } from './hooks';
import { ItemRenderer } from './itemRenderer';

export const ITEMS: Item[] = [
  { label: 'menu.priority.items.emergencyOnly', payload: PriorityEnum.Emergency },
  { label: 'menu.priority.items.high', payload: PriorityEnum.High },
  { label: 'menu.priority.items.medium', payload: PriorityEnum.Medium },
  { label: 'menu.priority.items.low', payload: PriorityEnum.Low },
  { label: 'menu.priority.items.diagnostic', payload: PriorityEnum.Diagnostic },
  { label: 'menu.priority.items.noAlerts', payload: PriorityEnum.NoAlerts },
];

export const Priority = () => {
  const { priority } = usePriorityModel();
  const { closeWidget } = useWidgetOperations();
  const { updatePriority } = usePriorityOperations();
  const { selectMenu } = useMenusOperations();
  const { t } = useTranslation();

  useCommandListener();

  const selectItem = useCallback((item: Item) => updatePriority(item.payload), [updatePriority]);

  const items = ITEMS.map(item => ({ ...item, selected: item.payload === priority }));
  useController('Priority', items, selectItem);

  const handleBackClick = () => {
    closeWidget();
    selectMenu('settings');
  };

  return (
    <Container title={t('menu.priority.title')} titleMobile={t('menu.settings')} handleClick={handleBackClick}>
      {items.map(item => (
        <ItemRenderer key={item.label} onClick={selectItem} item={item} />
      ))}
    </Container>
  );
};
