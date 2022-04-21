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
import { AudioWidget } from 'components/player/audio/Player.types';
import { MenuItem as Item } from 'components/skeleton/components/bottomMenu/components/MenuItem';
import { Logo, Title } from './Styles';

interface Props extends AudioWidget {
  onClick: () => void;
  selected: boolean;
  active?: boolean;
}

const MenuItemPure: FC<Props> = ({ selected, label, image, labelHidden, active, onClick }) => (
  <Item onClick={onClick} selected={selected && active} category={label}>
    <Logo src={`${image}`} alt={label} />
    {!labelHidden && <Title>{label}</Title>}
  </Item>
);

export const MenuItem = memo(MenuItemPure);
