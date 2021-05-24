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

import { useWidgetControl } from '../../../../hooks';
import { useGetSevenDayForecast } from './hooks';
import {
  Container,
  ContainerHeader,
  ContainerMessage,
  HeaderImage,
  HeaderLocation,
  HeaderTemp,
  HeaderTitle,
  WeatherDays,
} from './Styles';
import { WeatherDay } from './weatherDay';

export const SevenDayForecast = () => {
  const { data, loading } = useGetSevenDayForecast();

  useWidgetControl('Weather');

  if (loading) {
    return <ContainerMessage>Weather will update in a moment.</ContainerMessage>;
  }

  if (!data) {
    return <ContainerMessage>Weather is not available.</ContainerMessage>;
  }

  const { city, state, headerTemp, headerImage, headerTitle, days } = data;

  return (
    <Container>
      <ContainerHeader>
        <HeaderTemp>{headerTemp}°</HeaderTemp>

        <HeaderImage className={`wi wi-${headerImage}`} />

        <HeaderTitle>{headerTitle}</HeaderTitle>

        <HeaderLocation>
          {city}, {state}
        </HeaderLocation>
      </ContainerHeader>

      <WeatherDays>
        {days.map(day => (
          <WeatherDay key={day.dateTime} {...day} />
        ))}
      </WeatherDays>
    </Container>
  );
};
