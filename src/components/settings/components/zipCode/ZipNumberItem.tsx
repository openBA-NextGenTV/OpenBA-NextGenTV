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

import { FC, useEffect } from 'react';
import { Icon } from 'components/Icon';
import { InputEvent } from 'components/settings/components/zipCode/ZipCode';
import { IconWrapperDown, IconWrapperUp, ZipItem, ZipNumberContainer } from './Styles';

type ZipNumberItemProps = {
  handlerSelectedZipCode: (index: number) => void;
  handlerZipCode: (index: number, value: number) => void;
  index: number;
  selected: boolean;
  value: string;
};

export const ZipNumberItem: FC<ZipNumberItemProps> = ({
  index,
  value,
  selected,
  handlerZipCode,
  handlerSelectedZipCode,
}) => {
  useEffect(() => {
    if (selected && value === '') {
      handlerZipCode(index, 0);
    }
  }, [index, value, handlerZipCode, selected]);

  const handlerChange = (event: InputEvent) => {
    const currentValue = parseInt(value, 10);
    const updatedValue = parseInt(event.target.value.replace(value, ''), 10);
    const inputValue = Number.isNaN(updatedValue) ? currentValue : updatedValue;

    handlerZipCode(index, inputValue);
  };

  const handlerFocus = (event: InputEvent) => {
    handlerSelectedZipCode(index);

    if (event.target.value === '') {
      handlerZipCode(index, 0);
    }
  };

  const handlerBlur = () => {
    handlerSelectedZipCode(index);
  };

  return (
    <ZipNumberContainer data-test-id={`zip-number-container-${index + 1}`}>
      <IconWrapperUp selected={selected}>
        <Icon name="ArrowUpInput" />
      </IconWrapperUp>

      <ZipItem
        data-test-id={`zip-number-input-${index + 1}`}
        type="text"
        placeholder="0"
        value={value}
        onBlur={handlerBlur}
        onFocus={handlerFocus}
        onChange={handlerChange}
      />

      <IconWrapperDown selected={selected}>
        <Icon name="ArrowDownInput" />
      </IconWrapperDown>
    </ZipNumberContainer>
  );
};
