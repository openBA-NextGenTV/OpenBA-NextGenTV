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

const RE_FETCH_TIMEOUT = 3000;

export const loadUntilSuccess = (url: string) => {
  return new Promise(resolve => {
    let timout: number;

    const doFetch = () => {
      fetch(url, { cache: 'no-cache' })
        .then(value => value.json())
        .then(value => {
          clearTimeout(timout);
          resolve(value);
        })
        .catch(() => (timout = window.setTimeout(doFetch, RE_FETCH_TIMEOUT)));
    };

    doFetch();
  });
};

/**
 * Resolve promise when the request will be successful.
 * @param url
 */
export const checkUntilSuccess = (url: string) => {
  return new Promise(resolve => {
    let timout: number;

    const setupTimeout = () => (timout = window.setTimeout(doFetch, RE_FETCH_TIMEOUT));

    const doFetch = () => {
      fetch(url, { cache: 'no-cache' })
        .then(response => {
          if (response.ok) {
            clearTimeout(timout);
            resolve(true);
          } else {
            setupTimeout();
          }
        })
        .catch(() => setupTimeout());
    };

    doFetch();
  });
};
