/*
 * Copyright © 2022 Sinclair Broadcast Group
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { skeletonMenuComponentsMap, SkeletonMenuElement } from './skeletonMenuComponentsMap';
import { MenuPosition } from './skeletonMenuEnums';

export const useSkeletonMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getComponentKey = (param: MenuPosition) => searchParams.get(param) as SkeletonMenuElement;

  const getSkeletonComponent = (param: MenuPosition): ReactElement => {
    const elementKey = getComponentKey(param);

    return elementKey && skeletonMenuComponentsMap[elementKey];
  };

  const setMenuComponent = (params: { [key in MenuPosition]?: string }) => {
    const allParams: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      allParams[key] = value;
    });

    setSearchParams({ ...allParams, ...params });
  };

  return { getSkeletonComponent, setMenuComponent, getComponentKey };
};
