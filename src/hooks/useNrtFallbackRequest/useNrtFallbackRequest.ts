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

import { useEffect, useState } from 'react';

export const useNrtFallbackRequest = (url: string, urlLocal: string, fileType?: string, fileTypeLocal?: string) => {
  const [fileURL, setFileURL] = useState(null as string | null);
  const [data, setData] = useState(null as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isPresentFile = (url: string) => {
    fetch(url, { cache: 'no-cache' })
      .then(response => response.ok && setFileURL(url))
      .catch(() => {
        // do nothing
      });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      fileURL ? clearTimeout(timer) : isPresentFile(urlLocal);
    }, 1000);

    isPresentFile(url);

    if (fileURL) {
      const currentTypeFile = fileURL === url ? fileType : fileTypeLocal;
      if (currentTypeFile === 'json') {
        setLoading(true);
        fetch(fileURL, { cache: 'no-cache' })
          .then((response: any) => response.json())
          .then(response => setData(response))
          .catch(() => setError(true))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }

    return () => clearTimeout(timer);
  }, [fileURL, url, urlLocal, fileType, fileTypeLocal]);

  return { fileURL, data, loading, error };
};
