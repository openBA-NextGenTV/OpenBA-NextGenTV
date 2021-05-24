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

import { ThemeProvider } from 'styled-components';

import { ApolloProvider } from './apollo';
import { useGetAppConfigQuery } from './apollo/generated/graphql';
import { Container, ContentContainer } from './App.styles';
import { I18NProvider } from './i18n';
import { Cta } from './section/cta';
import { Initializer } from './section/initializer';
import { Menu } from './section/menu';
import { NotificationBar } from './section/notificationBar';
import { Widget } from './section/widget';

const ThemedContent = () => {
  const { data } = useGetAppConfigQuery();

  if (!data?.appConfig.theme) {
    return <></>;
  }

  return (
    <ThemeProvider theme={data.appConfig.theme}>
      <Cta />

      <Container>
        <ContentContainer>
          <Menu />
          <Widget />
        </ContentContainer>
        <NotificationBar />
      </Container>
    </ThemeProvider>
  );
};

export const App = () => (
  <I18NProvider>
    <ApolloProvider>
      <Initializer />
      <ThemedContent />
    </ApolloProvider>
  </I18NProvider>
);
