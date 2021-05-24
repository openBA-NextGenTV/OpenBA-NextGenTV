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

import { ApolloClient, gql } from '@apollo/client';
import objectHash from 'object-hash';

import {
  Endpoints,
  FeatureFlags,
  FlashChannel,
  GetFlashChannelDocument,
  GetFlashChannelQuery,
} from '../generated/graphql';
import { createFlashChannel } from '../typeFactory';
import { getHiddenFlashChannelFromLocalStorage, setHiddenFlashChannelToLocalStorage } from './flashChannel.fieldPolicy';
import { loader } from './loader';

export const initFlashChannelsStore = (client: ApolloClient<any>) => {
  client.writeQuery({
    query: GetFlashChannelDocument,
    data: {
      flashChannel: null,
    },
  });

  startPulling(client);
  initHiddenFlashChannel();
};

const initHiddenFlashChannel = () => {
  const hiddenFlashChannel = getHiddenFlashChannelFromLocalStorage();

  if (!hiddenFlashChannel) {
    setHiddenFlashChannelToLocalStorage('0');
  }
};

let lastLoadedFlashChannelHash: string;

const startPulling = (client: ApolloClient<any>) => {
  const doFetch = async () => {
    const featureFlags = readFlashChannelEnabled(client);
    const endpoints = readFlashChannelEndpoint(client);

    if (!featureFlags?.flashChannelEnabled || !endpoints?.flashChannelUrl) {
      return;
    }

    let flashChannel: FlashChannel | null = await loader(endpoints.flashChannelUrl);

    if (!flashChannel && !lastLoadedFlashChannelHash) {
      return;
    }

    const flashChannelHash = objectHash(flashChannel);

    const prevFlashChannel = getFlashChannelFromStore(client);
    const prevExpireTime = prevFlashChannel.flashChannel?.expireTime;
    const prevIsLive = prevFlashChannel.flashChannel?.isLive;

    if (prevExpireTime < Date.now() && prevExpireTime > 0) {
      flashChannel = { ...prevFlashChannel.flashChannel, expireTime: 0 };
    } else if (lastLoadedFlashChannelHash === flashChannelHash) {
      // pass only changed and real data
      return;
    }

    if (!flashChannel?.isLive && prevIsLive) {
      flashChannel = { ...prevFlashChannel.flashChannel, isLive: false, expireTime: Date.now() + 300000 };
    }

    lastLoadedFlashChannelHash = flashChannelHash;

    flashChannel && putFlashChannelIntoStore(client, createFlashChannel(flashChannel));
  };

  setInterval(async () => {
    await doFetch();
  }, 5000);

  doFetch();
};

const readFlashChannelEnabled = (client: ApolloClient<any>) =>
  client.readFragment<Pick<FeatureFlags, 'flashChannelEnabled'>>({
    id: 'FeatureFlags:1',
    fragment: gql`
      fragment readFlashChannelEnabled on FeatureFlags {
        flashChannelEnabled
      }
    `,
  });

const readFlashChannelEndpoint = (client: ApolloClient<any>) =>
  client.readFragment<Pick<Endpoints, 'flashChannelUrl'>>({
    id: 'Endpoints:1',
    fragment: gql`
      fragment readFlashChannelEndpoint on Endpoints {
        flashChannelUrl
      }
    `,
  });

const putFlashChannelIntoStore = (client: ApolloClient<any>, flashChannel: FlashChannel) =>
  client.writeQuery({
    query: GetFlashChannelDocument,
    data: {
      flashChannel,
    },
  });

const getFlashChannelFromStore = (client: ApolloClient<any>) =>
  client.readQuery({ query: GetFlashChannelDocument }) as GetFlashChannelQuery;
