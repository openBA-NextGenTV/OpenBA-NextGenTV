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

import { MENU_ITEM_TITLE } from 'pages/menu/components/feeds/components/menuItem/MenuItemsConfig';
import styled, { css } from 'styled-components';
import { minSize } from 'styles/responsive.mixins';
import { MenuItemProps } from './types';

export const MENU_ITEM_WIDTH = 19.4;

const FADE_GRADIENT =
  'linear-gradient(246.43deg, rgba(0, 0, 0, 0.49) 7.85%, rgba(0, 0, 0, 0.7) 64.12%)';

const SELECTED_GRADIENT = `radial-gradient(
        53.08% 20.47% at 50% 0%,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0) 100%
        ),
        linear-gradient(0deg, rgba(0, 0, 0, 0.4) -0.2%, rgba(0, 0, 0, 0) 28.89%),
        linear-gradient(0deg, rgba(28, 43, 63, 0.8), rgba(28, 43, 63, 0.8))`;

export const inactiveMenuItem = css`
  transform: scaleX(0.887) scaleY(0.881);
  filter: none;
`;

export const MenuItem = styled.div<MenuItemProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${MENU_ITEM_WIDTH}vw;
  height: 20vh;
  ${minSize('font-size', '2.4vw', '4.3vh')};
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  background-image: ${({ backgroundUrl }) => (backgroundUrl ? `url('${backgroundUrl}')` : 'none')};
  background-size: cover;
  background-repeat: no-repeat;
  ${minSize('border-radius', '1vw', '2vh')};
  box-shadow: inset -3px 3px 7px rgba(0, 0, 0, 0.55);
  transform: scaleX(0.887) scaleY(0.881);
  transition: all 0.25s ease-out;
  transition-delay: 0;
  box-sizing: border-box;
  overflow: hidden;

  ${inactiveMenuItem}

  &:before,
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-style: solid;
    border-color: #fcfcfc;
    border-radius: inherit;
    transition: all 0.25s ease-out;
  }

  &::before {
    opacity: 1;
    background: ${FADE_GRADIENT};
    ${minSize('border-width', '0.1vw', '0.2vh')};
  }

  &::after {
    opacity: 0;
    background: ${SELECTED_GRADIENT};
    ${minSize('border-width', '0.26vw', '0.46vh')};
    backdrop-filter: blur(7px);
  }

  .${MENU_ITEM_TITLE} {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -12px;
      width: 100%;
      height: 4px;
      background-color: #809dd3;
      ${minSize('border-radius', '0.4vw', '0.74vh')};
      transition: all 0.25s ease-out;
      opacity: 0;
      overflow: hidden;
    }
  }

  ${({ selected }) =>
    selected &&
    `
    transform: none;
    transition-delay: 0.25s;
    filter: drop-shadow(0px 7px 7px rgba(0, 0, 0, 0.65));

    &:before {
      opacity: 0;
    }

    &:after {
      opacity: 1;
    }

    .${MENU_ITEM_TITLE}:after {
      opacity: 1;
    }
  `}
`;
