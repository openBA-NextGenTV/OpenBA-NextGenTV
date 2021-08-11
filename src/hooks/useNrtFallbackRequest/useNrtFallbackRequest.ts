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

type Timer = {
  name: string;
  id: number;
};

type Status = {
  name: string;
  status: boolean;
};

import { useCallback, useEffect, useState } from 'react';

export const useNrtFallbackRequest = (urls: Array<string>) => {
  const [status, setStatus] = useState(urls.map(url => ({ name: url, status: false })));

  const isPresentFile = useCallback(
    (name: string, timer: number) => {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', name);
      xhr.onload = () => {
        if (xhr.status === 200) {
          const withStatus = status.map((file: Status) => (file.name === name ? { ...file, status: true } : file));

          setStatus(withStatus);
          clearTimeout(timer);
        }
      };

      xhr.send();
    },
    [status],
  );

  useEffect(() => {
    const timers: Timer[] = [];

    status.map(({ name, status }) => {
      if (!timers.some(timer => timer.name === name) && !status) {
        const timer: number = window.setInterval(() => {
          isPresentFile(name, timer);
        }, 1000);

        timers.push({ name, id: timer });
      }
    });

    return () => {
      timers.map(timer => clearTimeout(timer.id));
    };
  }, [isPresentFile, status]);
  return { status };
};
