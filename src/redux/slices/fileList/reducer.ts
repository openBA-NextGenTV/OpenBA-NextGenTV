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

import { hashString } from 'react-hash-string';
import { createSlice } from '@reduxjs/toolkit';
import { Media } from 'types/Alert';
import { File } from 'types/FileList';
import { fetchOTAAlertsMedias, fetchOTASevenDayForecast } from './actions';
import { InitialFileListState } from './types';

const initialState: InitialFileListState = {
  OTASevenDayForecast: null,
  fileViewerActive: false,
  OTAAlertsMedias: [],
};

const fileListSlice = createSlice({
  name: 'fileList',
  initialState,
  reducers: {
    setFileViewerActive: (state, { payload }) => {
      state.fileViewerActive = payload;
    },
  },
  extraReducers: {
    [fetchOTASevenDayForecast.fulfilled.toString()]: (state, action) => {
      const { data, url } = action.payload;
      const hash = hashString(JSON.stringify(data));
      const fileList = state.OTASevenDayForecast;

      if (hash !== fileList?.hash) {
        state.OTASevenDayForecast = {
          hash,
          name: url.split('/').pop(),
          size: JSON.stringify(data).length,
          lastUpdated: Date.now(),
        };
      }
    },
    [fetchOTASevenDayForecast.rejected.toString()]: (state) => {
      state.OTASevenDayForecast = null;
    },
    [fetchOTAAlertsMedias.fulfilled.toString()]: (state, action) => {
      const medias = action.payload;
      const currentMedias = state.OTAAlertsMedias;

      state.OTAAlertsMedias = medias.reduce((mediaFiles: File[], media: Media) => {
        const hash = hashString(JSON.stringify(media));
        const existedFile = currentMedias.find((mediaFile: File) => mediaFile.hash === hash);

        mediaFiles.push(
          existedFile || {
            hash,
            name: `${media.url.split('/').pop()}`,
            size: +media.contentLength,
            lastUpdated: Date.now(),
          }
        );

        return mediaFiles;
      }, []);
    },
    [fetchOTAAlertsMedias.rejected.toString()]: (state) => {
      state.OTAAlertsMedias = [];
    },
  },
});

export default fileListSlice.reducer;

export const { actions, reducer } = fileListSlice;
