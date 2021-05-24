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

import { useEffect, useRef, useState } from 'react';

import { useMenusModel } from '../../../../../../../state';

const HIDE_INTERVAL = 15000;

export const useAutoHide = () => {
  const timeout = useRef(-1);
  const [isHidden, setIsHidden] = useState(false);
  const { isVisible: isMenuVisible } = useMenusModel();

  const resetHideState = () => {
    clearTimeout(timeout.current);
    setIsHidden(false);
    timeout.current = window.setTimeout(() => {
      setIsHidden(true);
    }, HIDE_INTERVAL);
  };

  useEffect(() => {
    if (isMenuVisible) {
      clearTimeout(timeout.current);
    } else {
      resetHideState();
    }

    return () => clearTimeout(timeout.current);
  }, [isMenuVisible]);

  return { isHidden, resetHideState };
};
