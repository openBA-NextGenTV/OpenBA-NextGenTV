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

import { Feed, FeedCategory } from 'types/Feed';

export const MESSAGE_LOADING = 'Your videos are loading.';

export const getLoadingMassage = (
  category: string,
  loading?: boolean,
  isInternetConnected?: boolean
) => {
  if (!loading) return '';

  if (category === FeedCategory.Weather && !isInternetConnected && loading)
    return 'Loading. Connect your TV for better experience';

  return MESSAGE_LOADING;
};

export const getEmptyMessage = (category: string) => (
  <>
    Currently, there are no <b>{category || ''} Videos</b> available.
  </>
);

export const findActiveElement = (data: Feed, url: string) => {
  if (!data) {
    return null;
  }

  const index = data?.items.findIndex((item) => item.videoUrl === url);

  if (index === -1) {
    return null;
  }

  return { ...data?.items[index], index };
};

export const getFeedsWithWeather = (feeds: Feed[], weatherUrl?: string) => {
  if (weatherUrl)
    return [
      ...feeds,
      {
        id: FeedCategory.Weather,
        category: FeedCategory.Weather,
        items: [
          {
            id: 'latestWeathercast',
            title: 'Latest Weathercast',
            thumbnailUrl: 'assets/menuBackgrounds/weather.jpg',
            videoUrl: weatherUrl,
          },
        ],
      },
    ];

  return feeds;
};
