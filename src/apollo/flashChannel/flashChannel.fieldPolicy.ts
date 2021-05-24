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

import { TypePolicy } from '@apollo/client';

import { HIDDEN_FLASH_CHANNEL } from '../localStoreKeys';

export const hiddenFlashChannelFieldPolicy = (): TypePolicy['fields'] => ({
  hiddenFlashChannel: {
    read() {
      return getHiddenFlashChannelFromLocalStorage();
    },
    merge(_, incoming) {
      setHiddenFlashChannelToLocalStorage(incoming);
      return incoming;
    },
  },
});

export const getHiddenFlashChannelFromLocalStorage = () => localStorage.getItem(HIDDEN_FLASH_CHANNEL) || '0';
export const setHiddenFlashChannelToLocalStorage = (value: string) => localStorage.setItem(HIDDEN_FLASH_CHANNEL, value);
