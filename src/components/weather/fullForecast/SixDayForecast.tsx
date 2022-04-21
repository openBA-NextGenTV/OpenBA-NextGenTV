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
import { useSelector } from 'react-redux';
import { useSevenDayForecastFetch } from 'hooks/useWeather';
import { deviceSelectors } from 'redux/slices/device';
import { StatusMessage } from 'components/StatusMessage';
import { FlexRowOverflowed, SixDayForecastContainer } from './Styles';
import { WeatherDailyForecast } from './WeatherDailyForecast';

export const SixDayForecast: FC = () => {
  const { days, sevenDayForecastLoading } = useSevenDayForecastFetch();
  const isInternetConnected = useSelector(deviceSelectors.getNetworkStatus);
  const ottLoadingMessage = 'Your local forecast is loading.';

  const otaLoadingMessage =
    'Your local forecast is loading. Connect your TV to the internet for a better experience.';

  const loadingStatusMessage = isInternetConnected ? ottLoadingMessage : otaLoadingMessage;

  return (
    <SixDayForecastContainer>
      {days?.map((day) => (
        <FlexRowOverflowed key={day.dateTime}>
          <WeatherDailyForecast day={day} />
        </FlexRowOverflowed>
      ))}
      {sevenDayForecastLoading && <StatusMessage>{loadingStatusMessage}</StatusMessage>}
    </SixDayForecastContainer>
  );
};
