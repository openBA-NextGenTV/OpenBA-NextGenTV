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
import { AlertStatusText } from 'pages/alerts/components/styles';
import { getAlertBackgroundColor, getAlertState } from 'pages/alerts/service';
import { AlertCode } from 'pages/alerts/types';
import { Alert, AlertState } from 'types/Alert';
import { AlertItemContent, AlertItemWrapper } from './Styles';

type Selectable = {
  selected: boolean;
};

export const AlertRenderer: FC<Alert & Selectable> = ({
  id,
  title,
  status,
  eventCode,
  priority,
  selected,
}) => {
  const hasStatusText = status !== AlertState.ALERT;

  return (
    <AlertItemWrapper
      data-test-id={`alert-carousel-item-${id}`}
      color={getAlertBackgroundColor(eventCode as AlertCode, status, priority)}
      selected={selected}
    >
      <AlertItemContent>
        {hasStatusText && <AlertStatusText>{getAlertState(status)}</AlertStatusText>}
        {title}
      </AlertItemContent>
    </AlertItemWrapper>
  );
};
