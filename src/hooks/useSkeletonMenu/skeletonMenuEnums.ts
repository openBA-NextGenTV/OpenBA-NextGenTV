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

export const enum MenuPosition {
  CONTROLS = 'Controls',
  WIDGET = 'Widget',
  BOTTOM_MENU = 'BottomMenu',
}

export const enum WidgetElement {
  LEARN_MORE = 'learnMore',
  SETTINGS = 'settings',
  DAILYFORECAST = 'dailyForecast',
}
export const enum ControlsElement {
  CONTROLS = 'controls',
  SELECTED_MENU_LEARN_MORE = 'selectedMenuFaq',
  SELECTED_MENU_SETTINGS = 'selectedMenuSettings',
  SELECTED_MENU_WEATHER = 'selectedMenuWeather',
}
export const enum BottomElement {
  FEEDS = 'feeds',
  SIX_DAY_FORECAST = 'sixDayForecast',
  VOD_TOP_STORIES = 'vodTopStories',
  VOD_LOCAL_NEWS = 'vodLocalNews',
  VOD_NATION_WORLD = 'vodNationWorld',
  VOD_SPORTS = 'vodSports',
  VOD_ENTERTAIMENT = 'vodEntertainment',
  VOD_WEATHER = 'vodWeather',
  LOCAL_RADIO = 'localRadio',
}
