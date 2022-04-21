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

import styled from 'styled-components';

const DailyForecastHumidityUrl = './weather/humidity.svg';

export const SixDayForecastContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 23vh;
`;

export const DailyForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
export const FlexRowOverflowed = styled(FlexRow)`
  justify-content: space-evenly;
  width: 100%;
`;

export const DailyForecastHiTemp = styled.span`
  font-weight: bold;
  line-height: 40px;
  font-size: 36px;
  color: #fff;
  text-shadow: -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.75);
`;
export const DailyForecastLowTemp = styled(DailyForecastHiTemp)`
  font-weight: normal;
`;

export const DailyForecastHumidity = styled.div`
  margin-top: 13px;
  background-image: url(${DailyForecastHumidityUrl});
  background-repeat: no-repeat;
  font-weight: bold;
  font-size: 24px;
  line-height: 16px;
  display: flex;
  gap: 20px;
  align-items: center;
  color: #fcfcfc;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.75);
`;
