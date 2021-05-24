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

import { FC } from 'react';

import { dateFormatMonthAndDay, dateFormatWeekDay } from '../../../../../utils';
import { Day } from '../hooks/types';
import { Property } from './property';
import {
  Container,
  Date,
  HiTemp,
  Image,
  LowTemp,
  MonthAndDay,
  SecondImage,
  Temp,
  Title,
  WeekDay,
} from './WeatherDay.styled';

export const WeatherDay: FC<Day> = ({
  dateTime,
  image,
  title,
  hiTemp,
  lowTemp,
  precipitation,
  wind,
  windDirection,
  humidity,
  ultraviolet,
}) => (
  <Container>
    <Date>
      <WeekDay>{dateFormatWeekDay(dateTime)}</WeekDay>
      <MonthAndDay>{dateFormatMonthAndDay(dateTime)}</MonthAndDay>
    </Date>

    <Image className={`wi wi-stk-${image}`}>
      <SecondImage />
    </Image>

    <Title>{title}</Title>

    <Temp>
      <HiTemp>{hiTemp}°</HiTemp>
      <LowTemp>{lowTemp}°</LowTemp>
    </Temp>

    <Property label="Precipitation" value={`${precipitation}%`} />
    <Property label="Wind" value={`${wind} mph ${windDirection}`} />
    <Property label="Humidity" value={`${humidity}%`} />
    <Property label="UV" value={`${ultraviolet}`} />
  </Container>
);
