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

import { FC, memo } from 'react';
import { ReactComponent as Down } from 'assets/icons/arrow_down.svg';
import { ReactComponent as ArrowDownInput } from 'assets/icons/arrow_down_input.svg';
import { ReactComponent as Left } from 'assets/icons/arrow_left.svg';
import { ReactComponent as Right } from 'assets/icons/arrow_right.svg';
import { ReactComponent as Up } from 'assets/icons/arrow_up.svg';
import { ReactComponent as ArrowUpInput } from 'assets/icons/arrow_up_input.svg';
import { ReactComponent as Back } from 'assets/icons/back_arrow.svg';
import { ReactComponent as Check } from 'assets/icons/check.svg';
import { ReactComponent as Ok } from 'assets/icons/nav_ok.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as SettingsFilled } from 'assets/icons/settings_filled.svg';

export const icons: { [key: string]: FC } = {
  Ok,
  Back,
  Up,
  Down,
  Left,
  Right,
  ArrowUpInput,
  ArrowDownInput,
  Check,
  Settings,
  SettingsFilled,
};

const IconPure: FC<{ name: string }> = ({ name }) => {
  const SVG = icons[name];

  if (SVG) {
    return <SVG />;
  }

  return null;
};

export const Icon = memo(IconPure);
