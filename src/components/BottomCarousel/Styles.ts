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
import { minSize } from 'styles/responsive.mixins';
import { MENU_ITEM_CLASS } from 'components/skeleton/components/bottomMenu/components/MenuItem/MenuItem';
import {
  inactiveMenuItem,
  MENU_ITEM_WIDTH,
} from 'components/skeleton/components/bottomMenu/components/MenuItem/styles';

export const MAX_ITEMS_IN_ROW = 4;
const FADE_HEIGHT = '19.5vh';

export const BottomCarousel = styled.div<{
  disabled?: boolean;
  isSubmenu?: boolean;
}>`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 23vh;
  display: flex;
  align-items: center;
  padding-left: ${({ isSubmenu }) => (isSubmenu ? '1vw' : '0')};

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 0;
    width: 100%;
    height: ${FADE_HEIGHT};
    display: ${({ isSubmenu }) => (isSubmenu ? 'block' : 'none')};
    background: linear-gradient(0deg, #1c2b3f, #1c2b3f);
    box-shadow: inset 5px 3px 6px rgba(0, 0, 0, 0.55);
    ${minSize('border-top-left-radius', '1vw', '1.8vh')};
    ${minSize('border-bottom-left-radius', '1vw', '1.8vh')};
    transform: translateY(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${({ disabled }) => (disabled ? 'block' : 'none')};
    background: linear-gradient(180deg, rgba(32, 32, 32, 0.85) 90.62%, rgba(47, 47, 47, 0.85) 100%);
  }

  .slick-slider {
    width: 100%;
  }

  .slick-track {
    display: flex;
    align-items: center;
    overflow-y: visible;
  }

  .slick-list,
  .slick-track {
    height: 100%;
  }

  .slick-list {
    overflow: visible;
  }

  .slick-slide:not(.slick-active) .${MENU_ITEM_CLASS} {
    ${inactiveMenuItem}
  }
`;

export const OverflowWrapper = styled.div<{
  hideBlur: boolean;
  size: number;
  isSubmenu?: boolean;
}>`
  position: relative;
  width: ${({ size }) => (size < MAX_ITEMS_IN_ROW ? `${size * MENU_ITEM_WIDTH + 1}vw` : '100%')};
  padding-left: 1vw;
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;

  &:after {
    position: absolute;
    z-index: 1;
    content: '';
    top: 50%;
    right: 0;
    height: ${({ isSubmenu }) => (isSubmenu ? FADE_HEIGHT : '100%')};
    width: ${({ hideBlur }) => (hideBlur ? 0 : 9)}vw;
    background: linear-gradient(89.76deg, rgba(28, 43, 63, 0) 0.22%, rgba(28, 43, 63, 0.5) 99.81%);
    transition: all 0.25s ease-out;
    transform: translateY(-50%);
  }
`;
