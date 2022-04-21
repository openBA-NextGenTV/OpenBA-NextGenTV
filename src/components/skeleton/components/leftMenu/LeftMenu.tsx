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

import { FC, memo, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useSkeletonMenu } from 'hooks/useSkeletonMenu';
import { MenuPosition } from 'hooks/useSkeletonMenu/skeletonMenuEnums';
import { getSponsorBannerFlag } from 'redux/slices/appConfig/selectors';
import { ChannelLogo } from './components/channelLogo';
import { Controls } from './components/controls';
import { Header } from './components/header';
import { ElementWrapper, MainContainer, MenuContainer, SponsorBanner } from './styles';

interface Props {
  element: ReactElement | null;
}

const LeftMenuPure: FC<Props> = ({ element }) => {
  const { getSkeletonComponent } = useSkeletonMenu();
  const isSponsorBanner = useSelector(getSponsorBannerFlag);
  const MenuElement = getSkeletonComponent(MenuPosition.CONTROLS);
  const ControlsElement: ReactElement = MenuElement || <Controls />;

  return (
    <MainContainer>
      <MenuContainer>
        <ChannelLogo />
        <Header />
        {ControlsElement}
      </MenuContainer>
      <ElementWrapper data-test-id="left-widget-wrapper">{element}</ElementWrapper>
      {isSponsorBanner && <SponsorBanner isControlsElement={!MenuElement} />}
    </MainContainer>
  );
};

export const LeftMenu = memo(LeftMenuPure);
