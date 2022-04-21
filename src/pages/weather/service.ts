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

import { CustomDay, HourlyForecast } from 'types/Weather';
import { IDailyForecastData, IHourlyForecastData } from './widgets/DailyForecast/types';

enum Days {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

enum Hours {
  '12:00AM',
  '1:00AM',
  '2:00AM',
  '3:00AM',
  '4:00AM',
  '5:00AM',
  '6:00AM',
  '7:00AM',
  '8:00AM',
  '9:00AM',
  '10:00AM',
  '11:00AM',
  '12:00PM',
  '1:00PM',
  '2:00PM',
  '3:00PM',
  '4:00PM',
  '5:00PM',
  '6:00PM',
  '7:00PM',
  '8:00PM',
  '9:00PM',
  '10:00PM',
  '11:00PM',
}

function filterForecastByDay(list: Array<HourlyForecast>, day: Days) {
  return list.filter((item) => item.dayOfWeek === Days[day]);
}

function getHourByIndex(startHourIndex: number, currentIndex: number) {
  const evenHourIndex = startHourIndex % 2 === 1 ? startHourIndex - 1 : startHourIndex;
  const nextHourIndex = evenHourIndex + currentIndex;

  if (nextHourIndex > 23) return Hours[nextHourIndex - 24];

  return Hours[nextHourIndex];
}

function getGroupedHourlyForecast(
  hourlyList: Array<HourlyForecast>,
  dateTime: number
): Array<IHourlyForecastData> {
  if (!hourlyList?.length) return [];
  const currentDayIndex = new Date(dateTime).getDay() - 1;
  const currentDayRemainingHours = filterForecastByDay(hourlyList, currentDayIndex).length;
  const currentHourIndex = 24 - currentDayRemainingHours;
  const allDayForecast = hourlyList.slice(0, currentDayRemainingHours + currentHourIndex);
  const mappedList = [];

  for (let i = 0; i < allDayForecast.length; i++) {
    if (i % 2 === 0) {
      mappedList.push({
        iconCode: hourlyList[i].iconCode,
        iconName: hourlyList[i].iconName,
        time: getHourByIndex(currentHourIndex, i),
        temperature: hourlyList[i].temp,
      });
    }
  }

  return mappedList;
}

function mapResponseToDailyForecastWidget(data: CustomDay): IDailyForecastData {
  return {
    currentTemp: data.headerTemp,
    highestTemp: data.hiTemp,
    hourly: getGroupedHourlyForecast(data.hourly, data.dateTime),
    humidity: data.humidity,
    iconCode: data.dayIconCode as unknown as number,
    iconName: data.dayIconName,
    lowestTemp: data.lowTemp,
    precipitation: data.precipitation,
    ultraviolet: data.ultraviolet as unknown as number,
    windDirection: data.windDirection as unknown as number,
    windSpeed: data.wind,
  };
}

function getDateString(time: number): string | null {
  return time
    ? new Date(time).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
      })
    : null;
}

export { mapResponseToDailyForecastWidget, getDateString };
