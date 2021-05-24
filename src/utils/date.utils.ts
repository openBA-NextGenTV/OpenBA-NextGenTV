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

export const dateFormat = (date: Date, showSeconds?: boolean) => {
  const month = addFirstZeroIfNeed(date.getMonth() + 1);
  const day = addFirstZeroIfNeed(date.getDate());
  const hour = addFirstZeroIfNeed(date.getHours());
  const minutes = addFirstZeroIfNeed(date.getMinutes());

  const year = date.getFullYear();

  const seconds = showSeconds ? ':' + addFirstZeroIfNeed(date.getSeconds()) : '';

  return `${month}/${day}/${year} ${hour}:${minutes}${seconds}`;
};

const addFirstZeroIfNeed = (value: number) => (value.toString().length < 2 ? '0' + value : value);

export const dateFormatWeekDay = (date: number) => new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);

export const dateFormatMonthAndDay = (date: number) =>
  new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
  }).format(date);

export const isToday = (date: number) => {
  const today = new Date();
  const dateToCheck = new Date(date);
  return (
    dateToCheck.getDate() === today.getDate() &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getFullYear() === today.getFullYear()
  );
};

export const secondsToString = (secondsInput: number) => {
  if (!secondsInput) return '';

  const hours = Math.floor(secondsInput / 3600);
  const minutes = Math.floor((secondsInput - hours * 3600) / 60);
  const seconds = secondsInput - hours * 3600 - minutes * 60;

  let result = hours > 0 ? hours + 'h ' : '';
  result += minutes > 0 ? minutes + 'm ' : '';
  result += (seconds < 10 ? '0' + seconds : seconds) + 's';

  return result;
};
