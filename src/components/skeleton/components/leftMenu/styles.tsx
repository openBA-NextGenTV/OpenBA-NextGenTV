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

const bannerUrl = 'assets/banner/sponsorBanner.png';

const MenuContainer = styled.div`
  width: 100%;
  background: linear-gradient(110.19deg, rgba(54, 54, 54, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%);
  padding-bottom: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  display: flex;
  width: 23vw;
  min-width: 160px;
  flex-shrink: 0;
  position: relative;
  height: 100vh;
  background: linear-gradient(
    110.63deg,
    #395fa6 17.91%,
    #5487e3 29.33%,
    #284885 50.65%,
    #4368aa 92.83%
  );
  flex-direction: column;
  align-items: center;
`;

const ElementWrapper = styled.div`
  width: 100%;
  padding: 2vh 1.5vw 3vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`;

const SponsorBanner = styled.div<{ isControlsElement: boolean }>`
  width: 15.6vw;
  height: ${({ isControlsElement }) => (isControlsElement ? '23.1vh' : '6vh')};
  margin: auto auto 5.6vh;
  background-image: url(${bannerUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export { MenuContainer, MainContainer, ElementWrapper, SponsorBanner };
