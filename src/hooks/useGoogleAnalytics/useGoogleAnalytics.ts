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

import { useCallback, useState } from 'react';
import ReactGA from 'react-ga';

import { useDeviceInfoModel } from '../../state';

const defaultQuartiles: { [key: string]: string } = {
  0: '',
  25: '25',
  50: '50',
  75: '75',
  100: '100',
};
const initialReachedQuartiles: Array<string> = [];

export const useGoogleAnalytics = () => {
  const [reachedQuartiles, setReachedQuartiles] = useState(initialReachedQuartiles);
  const { serviceId } = useDeviceInfoModel();

  const updateQuartiles = useCallback(
    (progress): Array<string> => {
      const keysToUpdate = Object.keys(defaultQuartiles)
        .filter(key => key <= progress)
        .filter(key => reachedQuartiles.indexOf(defaultQuartiles[key]) === -1);

      const quartilesToUpdate = keysToUpdate.map(key => defaultQuartiles[key]);

      setReachedQuartiles([...quartilesToUpdate, ...reachedQuartiles]);
      return quartilesToUpdate;
    },
    [reachedQuartiles, setReachedQuartiles],
  );

  const trackVideoProgress = useCallback(
    (categoryOfVideo, title, progress) => {
      const reachedQuartile = updateQuartiles(progress);

      reachedQuartile.forEach(quartile => {
        ReactGA.event({
          category: serviceId,
          action: 'video',
          label: `${categoryOfVideo}/${title}--${quartile}`,
        });
      });
    },
    [serviceId, updateQuartiles],
  );

  return {
    trackVideoProgress,
  };
};
