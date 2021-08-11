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

import { Menu } from '../../../../apollo/generated/graphql';
import { useMenusModel, useMenusOperations, useWidgetOperations } from '../../../../state';
import { isMobile, setFocusedItemToTop } from '../../../../utils';
import { Container, SubTitle, Thumbnail, Title, TitleImage, TitleWrapper } from './TextItemRenderer.styles';

type Props = {
  menu: Menu;
};

export const TextItemRenderer: FC<Props> = ({
  menu: { id, titleImage, title, titleHidden, selected, thumbnail, subTitle, widget },
}) => {
  const { isDisable } = useMenusModel();
  const { selectMenu, unselectMenu } = useMenusOperations();
  const { openWidget, closeWidget } = useWidgetOperations();
  const { t } = useTranslation();

  const itemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    selected && setFocusedItemToTop(itemRef);
  }, [selected, itemRef]);

  const containerClickHandler = () => {
    selectMenu(id);

    if (id === 'menu_logo') {
      closeWidget();

      if (isMobile()) {
        unselectMenu();
      }
    } else if (widget) {
      openWidget(widget);
    }
  };

  return (
    <Container
      id={`${id}_item`}
      onClick={containerClickHandler}
      selected={selected}
      isDisable={isDisable}
      ref={itemRef}
    >
      {thumbnail && <Thumbnail src={thumbnail} />}

      <TitleWrapper>
        {titleImage && <TitleImage src={titleImage} alt={titleImage} />}

        {!titleHidden && <Title contentLength={t(title).length}>{t(title)}</Title>}
      </TitleWrapper>

      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </Container>
  );
};
