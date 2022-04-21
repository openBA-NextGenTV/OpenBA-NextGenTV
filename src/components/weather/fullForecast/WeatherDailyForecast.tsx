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

import { FC } from 'react';
import { getDateString } from 'pages/weather/service';
import { Day } from 'types/Weather';
import { WeatherIcon } from 'components/WeatherIcon';
import { toDegree } from 'utils/format';
import { DateName } from '../Styles';
import {
  DailyForecastContainer,
  DailyForecastHiTemp,
  DailyForecastHumidity,
  DailyForecastLowTemp,
  FlexColumn,
  FlexRow,
} from './Styles';

interface Props {
  day: Day;
}

export const WeatherDailyForecast: FC<Props> = ({ day }) => {
  const dateName = getDateString(day.dateTime);

  return (
    <DailyForecastContainer>
      <DateName>{dateName}</DateName>
      <FlexRow>
        <FlexColumn>
          <WeatherIcon iconCode={day.dayIconCode} size={60} />
        </FlexColumn>

        <FlexColumn>
          <DailyForecastHiTemp>{toDegree(day.hiTemp)}</DailyForecastHiTemp>
          <DailyForecastLowTemp>{toDegree(day.lowTemp)}</DailyForecastLowTemp>
        </FlexColumn>
      </FlexRow>

      <DailyForecastHumidity>
        <img src="./assets/weather/humidity.svg" alt="weather" />
        {day.humidity}%
      </DailyForecastHumidity>
    </DailyForecastContainer>
  );
};
