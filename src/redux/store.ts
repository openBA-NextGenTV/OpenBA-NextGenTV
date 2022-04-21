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

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { alertReducer } from './slices/alerts';
import { appConfigReducer } from './slices/appConfig';
import { ctaReducer } from './slices/cta';
import { deviceReducer } from './slices/device';
import { feedsReducer } from './slices/feeds';
import { fileListReducer } from './slices/fileList';
import { radiosReducer } from './slices/radio';
import { skeletonMenuReducer } from './slices/skeletonMenu';
import { userSettingsReducer } from './slices/userSettings';
import { weatherReducer } from './slices/weather';

const rootReducer = combineReducers({
  cta: ctaReducer,
  alert: alertReducer,
  device: deviceReducer,
  appConfig: appConfigReducer,
  weather: weatherReducer,
  feeds: feedsReducer,
  userSettings: userSettingsReducer,
  skeletonMenu: skeletonMenuReducer,
  fileList: fileListReducer,
  radios: radiosReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['alert'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
