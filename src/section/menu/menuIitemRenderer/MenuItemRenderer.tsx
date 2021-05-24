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

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Menu } from '../../../apollo/generated/graphql';
import { useMenusOperations } from '../../../state';
import { dateFormat } from '../../../utils';
import { ArrowBack } from '../../widget/widgets/common';
import { Container, Image, ImageWrapper, ItemsContainer, NoItemsText, Time } from './MenuItemRenderer.styles';
import { TextItemRenderer } from './textItemRenderer';

type MenuRendererProps = {
  menu: Menu;
};

export const MenuItemRenderer: FC<MenuRendererProps> = ({
  menu: { id, title, footerImage, showTime, items, selected, noItemsText },
}) => {
  const { t } = useTranslation();
  const { unselectMenuItems } = useMenusOperations();

  const handleClickBack = () => {
    unselectMenuItems();
    unselectMenuItems();
  };

  return (
    <Container id={id} isSelected={!!selected}>
      {showTime && <Time>{dateFormat(new Date())}</Time>}

      {title && <ArrowBack title={t(title)} titleMobile="Menu" handleClick={handleClickBack} />}

      {items && (
        <ItemsContainer>
          {items.map(item => (
            <TextItemRenderer key={item.id} menu={item} />
          ))}
          {noItemsText && items.length === 0 && <NoItemsText>{noItemsText}</NoItemsText>}
        </ItemsContainer>
      )}

      {footerImage && (
        <ImageWrapper>
          <Image src={footerImage} alt="Sponsorship Image" />
        </ImageWrapper>
      )}
    </Container>
  );
};
