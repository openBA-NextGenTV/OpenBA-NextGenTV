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

import { useSevenDayForecastFetch } from 'hooks/useWeather';
import { getDateString, mapResponseToDailyForecastWidget } from 'pages/weather/service';
import { StatusMessage } from 'components/StatusMessage';
import { DateName } from 'components/weather';
import { WeatherIcon } from 'components/WeatherIcon';
import { toDegree } from 'utils/format';
import HourlyForecastList from './components/HourlyForecastList';
import TitleWithValue from './components/TitleWithValue';
import * as S from './styles';

function DailyForecastWidget() {
  const { currentDay, sevenDayForecastLoading } = useSevenDayForecastFetch();
  const data = mapResponseToDailyForecastWidget(currentDay);
  const dayName = getDateString(currentDay.dateTime);

  return sevenDayForecastLoading ? (
    <S.WidgetContainer>
      <StatusMessage>Loading...</StatusMessage>
    </S.WidgetContainer>
  ) : (
    <S.WidgetContainer>
      <S.DailyWrapper>
        <DateName>{dayName}</DateName>
        <S.FlexRowCenter>
          <WeatherIcon iconCode={data.iconCode} size={90} />
          <S.CurrentTemp>{toDegree(data.currentTemp)}</S.CurrentTemp>
        </S.FlexRowCenter>

        <S.FlexRowCenter>
          <S.HighestTemp>{toDegree(data.highestTemp)}</S.HighestTemp>
          <WeatherIcon iconCode={data.iconCode} />
          <S.LowestTemp>{toDegree(data.lowestTemp)}</S.LowestTemp>
        </S.FlexRowCenter>

        <S.FlexRow>
          <TitleWithValue
            titleText="Precip."
            value={data.precipitation}
            valueText={`${data.precipitation}%`}
          />
          <TitleWithValue
            titleText="Wind"
            value={data.windSpeed}
            valueText={`${data.windSpeed} mph ${data.windDirection}`}
          />
          <TitleWithValue
            titleText="Humidity"
            value={data.humidity}
            valueText={`${data.humidity}%`}
          />
          <TitleWithValue titleText="UV" value={data.ultraviolet} valueText={data.ultraviolet} />
        </S.FlexRow>
      </S.DailyWrapper>

      {data.hourly?.length ? (
        <S.HourlyWrapper>
          <HourlyForecastList list={data.hourly} />
        </S.HourlyWrapper>
      ) : null}
    </S.WidgetContainer>
  );
}

export default DailyForecastWidget;
