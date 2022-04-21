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
import { Icon } from 'components/Icon';
import { IconContainer } from './Styles';

export enum NavIcons {
  Ok = 'ok',
  Up = 'up',
  Back = 'back',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Vertically = 'vertically',
  Horizontally = 'horizontally',
  AllDirections = 'allDirections',
}

const IconsRelations = {
  ok: ['Ok'],
  back: ['Back'],
  up: ['Up'],
  down: ['Down'],
  left: ['Left'],
  right: ['Right'],
  vertically: ['Up', 'Down'],
  horizontally: ['Left', 'Right'],
  allDirections: ['Up', 'Down', 'Left', 'Right'],
};

type Props = { icon: NavIcons };

export const NavIcon: FC<Props> = ({ icon }) => (
  <IconContainer>
    {IconsRelations[icon].map((name) => (
      <Icon key={name} name={name} />
    ))}
  </IconContainer>
);
