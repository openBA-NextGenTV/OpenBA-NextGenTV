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

import { ApolloClient, ApolloProvider as Provider, InMemoryCache, Resolvers, TypePolicy } from '@apollo/client';
import { FC } from 'react';

import { alertsMutation, hiddenAlertFieldPolicy, initAlertsStore } from './alerts';
import { initAppConfigStore } from './appConfig';
import { initDeviceInfoStore } from './deviceInfo';
import { fipsFieldPolicy, fipsMutation } from './fips';
import { flashChannelMutation, hiddenFlashChannelFieldPolicy, initFlashChannelsStore } from './flashChannel';
import { initMenuStore, initMenuWatchers, menuMutation } from './menu';
import { initPriorityStore, priorityFieldPolicy, priorityMutation } from './priority';
import { initWidgetStore, widgetMutation } from './widget';

/**
 * Apollo store are based on these concepts:
 * FieldPolicy
 * Mutation
 * Query
 * Store Initializer
 * Watcher
 *
 * FieldPolicy. Where you have to put config for apollo if you'd like to manage storing functionality by yourself
 * (ie store in localStore instead of apollo store)
 *
 * Mutation. To update anything in the store from outside of the apollo module - you have to use mutations.
 * All mutation lives in ***.mutation.ts
 *
 * Query. All queries which you use inside of this package should be places in ***.query.ts
 *
 * Store Initializer. To init store with some default value - use this module.
 *
 * Watcher. If a feature depends on another feature's value - watcher is what you need.
 */

const rootFieldPolicies: TypePolicy['fields'] = {};

Object.assign(rootFieldPolicies, fipsFieldPolicy());
Object.assign(rootFieldPolicies, priorityFieldPolicy());
Object.assign(rootFieldPolicies, hiddenAlertFieldPolicy());
Object.assign(rootFieldPolicies, hiddenFlashChannelFieldPolicy());

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: rootFieldPolicies,
    },
    Menu: {
      fields: {
        items: {
          merge: (existing, incoming) => incoming,
        },
      },
    },
  },
});

const resolvers: Resolvers = {
  Mutation: {},
};

Object.assign(resolvers.Mutation, menuMutation.Mutation);
Object.assign(resolvers.Mutation, alertsMutation.Mutation);
Object.assign(resolvers.Mutation, flashChannelMutation.Mutation);
Object.assign(resolvers.Mutation, priorityMutation.Mutation);
Object.assign(resolvers.Mutation, fipsMutation.Mutation);
Object.assign(resolvers.Mutation, widgetMutation.Mutation);

const client = new ApolloClient({
  cache,
  resolvers,
});

const initStoreInitializers = async () => {
  await initDeviceInfoStore(client);
  await initAppConfigStore(client);
  initMenuStore(client);
  initAlertsStore(client);
  initFlashChannelsStore(client);
  initPriorityStore();
  initWidgetStore(client);
};

initStoreInitializers().then(() => initWatchers());

const initWatchers = () => {
  initMenuWatchers(client);
};

export const ApolloProvider: FC = ({ children }) => <Provider client={client}>{children}</Provider>;
