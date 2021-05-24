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

import { useAlertsModel, useDeviceInfoModel, useFlashChannelModel } from '../../../state';

let ctaIsVisibleTimeoutId: number | undefined;

export const useCta = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { alert } = useAlertsModel();
  const { flashChannel } = useFlashChannelModel();
  const { station } = useDeviceInfoModel();
  const logoUrl = station ? `stations/${station}/logo.png` : null;

  useEffect(() => {
    /*
    1. If we already show CTA button - don't show it again.
    2. If alert is present in AlertBar - don't show CTA button
    3. Let wait 5 seconds and hide CTA button
     */
    if (!isVisible) {
      return;
    }

    if (alert || flashChannel) {
      setIsVisible(false);
    } else {
      if (ctaIsVisibleTimeoutId) {
        clearTimeout(ctaIsVisibleTimeoutId);
      }

      ctaIsVisibleTimeoutId = window.setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
  }, [alert, flashChannel, isVisible]);

  return {
    isVisible,
    logoUrl,
  };
};
