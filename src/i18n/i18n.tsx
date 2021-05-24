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

import i18n from 'i18next';
import { FC } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import es from './translations/es.json';

i18n.use(initReactI18next).init({
  nsSeparator: false,
  lng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: en,
    },
    es: {
      common: es,
    },
  },
});

export const I18NProvider: FC = ({ children }) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
