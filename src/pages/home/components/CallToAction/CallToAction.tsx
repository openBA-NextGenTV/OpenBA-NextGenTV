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

import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { ReactComponent as NavIconBack } from 'assets/icons/NavIconBack_blue.svg';
import { ReactComponent as NavIconLeft } from 'assets/icons/NavIconLeft_blue.svg';
import { ReactComponent as NavIconRight } from 'assets/icons/NavIconRight_blue.svg';
import { GaAction } from 'types/GA';
import { ChannelLogo } from 'components/skeleton/components/leftMenu/components/channelLogo/ChannelLogo';
import * as S from './styles';

const CTA_NAV_ITEMS = [
  { icon: <NavIconRight />, text: 'main menu' },
  { icon: <NavIconLeft />, text: 'emergency alerts' },
  { icon: <NavIconBack />, text: 'exit' },
];

function CallToAction() {
  useEffect(() => {
    ReactGA.event({ category: 'App', action: GaAction.Start });
  }, []);

  return (
    <S.Container data-test-id="cta-top-container">
      <S.Title>Press any button to begin your experience</S.Title>
      <S.NavContainer>
        {CTA_NAV_ITEMS.map((item) => (
          <S.NavItem key={item.text}>
            <S.NavIcon>{item.icon}</S.NavIcon>
            <S.NavText>{item.text}</S.NavText>
          </S.NavItem>
        ))}
      </S.NavContainer>
      <ChannelLogo />
    </S.Container>
  );
}

export default CallToAction;
