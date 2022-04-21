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

import { getAlertState } from 'pages/alerts/service';
import { HorizontalNavBar } from 'components/Navigation';
import { QRCode } from 'components/QRCode';
import { TextTicker } from 'components/TextTicker';
import AlertIcon from '../AlertIcon';
import { AlertStatusText } from '../styles';
import { ALERTS_BAR_NAV_ITEMS } from './navbar.config';
import * as S from './styles';
import { AlertState, IAlertBarProps } from './types';

function AlertBar(props: IAlertBarProps) {
  return (
    <S.AlertBarContainer data-test-id="alert-bar" color={props.backgroundColor}>
      <AlertIcon
        eventCode={props.alertCode}
        isCanceled={props.alertStatus === AlertState.CANCEL}
        color={props.backgroundColor}
      />

      <S.AlertText color={props.backgroundColor}>
        <TextTicker key={props.alertText} speed={20} offset="run-in" mode="await">
          {props.alertText}
        </TextTicker>
      </S.AlertText>

      {props.alertStatus ? (
        <S.StatusWrapper>
          <AlertStatusText>{getAlertState(props.alertStatus)}</AlertStatusText>
        </S.StatusWrapper>
      ) : null}

      {props.alertUrl ? <QRCode value={props.alertUrl} size={props.qrSize} includeMargin /> : null}

      {!props.withoutNav ? (
        <S.NavBarWrapper>
          <HorizontalNavBar navItems={ALERTS_BAR_NAV_ITEMS} />
        </S.NavBarWrapper>
      ) : null}
    </S.AlertBarContainer>
  );
}

export default AlertBar;
