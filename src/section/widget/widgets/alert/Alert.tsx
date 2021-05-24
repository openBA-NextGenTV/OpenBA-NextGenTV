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

import { Alert as AlertModel } from '../../../../apollo/generated/graphql';
import { WidgetComponentProps } from '../../index';
import { Container } from './Alert.styles';
import { AlertBody } from './alertBody';
import { useAlert } from './hooks';
import { SideMenu } from './sideMenu';

export const Alert: FC<WidgetComponentProps> = ({ widget: { payload } }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const alert: AlertModel = JSON.parse(payload!);
  const { selectedPage, pages, pageClickHandler } = useAlert(alert);

  return (
    <Container>
      <SideMenu pages={pages} onPageClick={pageClickHandler} />

      <AlertBody page={selectedPage} alertTitle={alert.menuTitle} />
    </Container>
  );
};
