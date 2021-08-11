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
import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useMenusModel } from '../../../../../../state';
import { setFocusedItemToTop } from '../../../../../../utils';
import { ArrowBack } from '../../../common';
import { PageItemModel } from '../../hooks';
import { Container, Title } from './Renderer.styles';

type Props = {
  onContainerClick: (page: PageItemModel) => void;
  page: PageItemModel;
};

export const WithRendererContainer: FC<Props> = ({ onContainerClick, page, children }) => {
  const { highlighted } = page;
  const pageRef = useRef(null);
  const { isDisable } = useMenusModel();

  useEffect(() => {
    highlighted && setFocusedItemToTop(pageRef, true);
  }, [pageRef, highlighted]);

  return (
    <Container
      key={page.title}
      selected={highlighted}
      onClick={() => onContainerClick(page)}
      isDisable={isDisable}
      ref={pageRef}
    >
      {children}
    </Container>
  );
};

type RendererProps = {
  page: PageItemModel;
};

export const TitleRenderer: FC<RendererProps> = ({ page }) => {
  const { title } = page;

  return <Title>{title}</Title>;
};

export const BackButtonRenderer = () => {
  const { t } = useTranslation();

  return <ArrowBack title={t('menu.alerts')} titleMobile={t('menu.alerts')} forceArrowVisible />;
};
