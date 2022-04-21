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

import { createSelector } from 'reselect';
import { File } from 'types/FileList';
import { InitialFileListState } from './types';

interface State {
  fileList: InitialFileListState;
}

export const getFileViewerActive = (state: State) => state.fileList.fileViewerActive;

export const getOTASevenDayForecast = (state: State) => state.fileList?.OTASevenDayForecast;

export const getOTAAlertsMedias = (state: State) => state.fileList?.OTAAlertsMedias;

export const getFileList = createSelector(
  getOTASevenDayForecast,
  getOTAAlertsMedias,
  (OTASevenDayForecast, OTAAlertsMedias) => {
    const allFiles: File[] = [];

    if (OTASevenDayForecast) {
      allFiles.push(OTASevenDayForecast);
    }

    if (OTAAlertsMedias) {
      OTAAlertsMedias.forEach((file: File) => allFiles.push(file));
    }

    return allFiles;
  }
);
