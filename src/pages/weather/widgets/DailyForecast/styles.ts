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

const WidgetContainer = styled.div`
  position: relative;
  height: 58vh;
  display: flex;
  flex-direction: column;
  border: 2px solid #ffffff;
  border-radius: 30px;
  background: linear-gradient(0deg, rgba(53, 116, 174, 0.3), rgba(53, 116, 174, 0.3)),
    linear-gradient(180deg, rgba(24, 42, 64, 0.7) 0%, rgba(24, 42, 64, 0.2) 100%);
  background-blend-mode: overlay, normal;
  mix-blend-mode: normal;
  overflow: hidden;
`;

const DailyWrapper = styled.section`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 25px 0;
`;

const HourlyWrapper = styled.section`
  position: relative;
  background: linear-gradient(116.89deg, rgba(0, 0, 0, 0.35) 19.31%, rgba(0, 0, 0, 0.56) 96.69%);
  height: 37%;
  overflow: hidden;
  box-shadow: inset -2px 3px 3px rgba(0, 0, 0, 0.25);

  &:after {
    content: '';
    height: 40px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1), transparent);
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const FlexRowCenter = styled(FlexRow)`
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

const CurrentTemp = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 90px;
  line-height: 108px;
`;

const HighestTemp = styled(CurrentTemp)`
  font-size: 42px;
  line-height: 1;
  text-shadow: -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.75);
`;

const LowestTemp = styled(HighestTemp)`
  font-weight: normal;
`;

export {
  WidgetContainer,
  DailyWrapper,
  HourlyWrapper,
  FlexRow,
  FlexRowCenter,
  CurrentTemp,
  HighestTemp,
  LowestTemp,
};
