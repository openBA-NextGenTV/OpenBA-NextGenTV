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

export const weatherIcons = `
@font-face {
    font-family: 'weathericons';
    src: url('weather.woff');
    font-weight: normal;
    font-style: normal;
  }

.wi {
    display: inline-block;
    font-family: 'weathericons', serif;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.wi-65:before, .wi-85:before {
    content: '';
}

.wi-69:before {
    content: '';
}

.wi-78:before {
    content: '';
}

.wi-70:before {
    content: '';
}

.wi-72:before {
    content: '';
}

.wi-87:before {
    content: '';
}

.wi-74:before, .wi-77:before {
    content: '';
}

.wi-66:before {
    content: '';
}

/*!
 * Night Time Icon Classes
 *
 * Standard Single Glyph Icon
 *
 */
.wi-97:before {
    content: '';
}

.wi-99:before, .wi-103:before {
    content: '';
}

.wi-107:before {
    content: '';
}

.wi-106:before {
    content: '';
}

.wi-95:before, .wi-96:before {
    content: '';
}

.wi-98:before, .wi-102:before {
    content: '';
}

.wi-100:before, .wi-101:before {
    content: '';
}

/*!
 * Neutral Icon Classes
 *
 * Standard Single Glyph Icon
 *
 */

.wi-67:before {
    content: '';
}

.wi-88:before, .wi-89:before {
    content: '';
}

.wi-82:before {
    content: '';
}

.wi-79:before, .wi-90:before {
    content: '';
}

.wi-80:before, .wi-83:before {
    content: '';
}

.wi-76:before {
    content: '';
}

.wi-84:before, .wi-116:before {
    content: '';
}

.wi-80:before, .wi-83:before {
    content: '';
}

.wi-75:before {
    content: '';
}

[class*='wi-stk-'] {
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 1.3em;
    width: 1.3em;
    line-height: normal;
}

[class*='wi-stk-']::before, [class*='wi-stk-']::after, [class*='wi-stk-'] span::before, [class*='wi-stk-'] span::after {
    display: block;
    position: absolute;
    white-space: normal;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-indent: 0;
    font-size: 1em;
    font-weight: 400 !important;
    font-style: normal !important;
    padding: 5px 0 0 5px;
}

/*  Weather Icons - Stacked Icon
 *  Day Time Icons
 */
.wi-stk-65::before, .wi-stk-85::before {
    text-align: center;
    vertical-align: middle;
    color: #f8b500;
    content: '\f00d';
}

.wi-stk-69::before {
    color: #f8b500;
    content: '';
}

.wi-stk-69 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-78::before {
    color: #f8b500;
    content: '';
}

.wi-stk-78 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-78 > span::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-70::before {
    color: #f8b500;
    content: '';
}

.wi-stk-70 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-70 > span::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-87::before {
    color: #f8b500;
    content: '';
}

.wi-stk-87 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-87 > span::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-74::before, .wi-stk-77::before {
    color: #f8b500;
    content: '';
}

.wi-stk-74 > span::before, .wi-stk-77 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-74 > span::after, .wi-stk-77 > span::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-66::before {
    color: #f8b500;
    content: '\f135';
}

.wi-stk-66 > span::before {
    color: #848484;
    content: '\f134';
}

.wi-stk-72::before {
    color: #848484;
    content: '';
}

/*!
 *  Weather Icons - Stacked Icon
 *  Night Time alt Icons
 */

.wi-stk-99::before, .wi-stk-103::before {
    color: #848484;
    content: '';
}

.wi-stk-99 > span::before, .wi-stk-103 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-107::before {
    color: #848484;
    content: '';
}

.wi-stk-107 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-107 > span::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-106::before {
    color: #848484;
    content: '';
}

.wi-stk-106 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-106 > span::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-95::before, .wi-stk-96::before {
    color: #848484;
    content: '';
}

.wi-stk-95 > span::before, .wi-stk-96 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-95 > span::after, .wi-stk-96 > span::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-95::after, .wi-stk-96::after {
    color: #1e87e8;
    content: '';
}

/*!
 *  Weather Icons - Stacked Icon
 *  Night Time Icons
 */
.wi-stk-97::before {
    color: #848484;
    content: '';
}

.wi-stk-100::before, .wi-stk-101::before {
    color: #848484;
    content: '';
}

.wi-stk-100 > span::before, .wi-stk-101 > span::before {
    color: #848484;
    content: '';
}

.wi-stk-100 > span::after, .wi-stk-101 > span::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-100::after, .wi-stk-101::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-98::before, .wi-stk-102::before {
    color: #848484;
    content: '';
}

.wi-stk-98 > span::before, .wi-stk-102 > span::before {
    color: #848484;
    content: '';
}

/*!
 *  Weather Icons - Stacked Icon
 *  Neutral Icons
 */

.wi-stk-67::before {
    color: #848484;
    content: '';
}

.wi-stk-84::before, .wi-stk-116::before {
    color: #848484;
    content: '';
}

.wi-stk-84 > span::before, .wi-stk-116 > span::before {
    color: #1e87e8;
    content: '';
}

.wi-stk-84 > span::after, .wi-stk-116 > span::after {
    color: #1e87e8;
    content: '';
}

.wi-stk-88::before, .wi-stk-89::before {
    color: #848484;
    content: '';
}

.wi-stk-88 > span::before, .wi-stk-89 > span::before {
    color: #1e87e8;
    content: '';
}

.wi-stk-82::before {
    color: #848484;
    content: '';
}

.wi-stk-82 > span::before {
    color: #1e87e8;
    content: '';
}

.wi-stk-79::before, .wi-stk-90::before {
    color: #848484;
    content: '';
}

.wi-stk-79 > span::before, .wi-stk-90 > span::before {
    color: #1e87e8;
    content: '';
}

.wi-stk-80::before, .wi-stk-83::before {
    color: #848484;
    content: '';
}

.wi-stk-80 > span::before, .wi-stk-83 > span::before {
    color: #1e87e8;
    content: '';
}

.wi-stk-76::before {
    color: #848484;
    content: '';
}

.wi-stk-76 > span::before {
    color: #1e87e8;
    content: '';
}

.wi-stk-75::before {
    color: #848484;
    content: '';
}`;
