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
import QRCode from 'qrcode.react';

interface QRCodeComponentProps {
  value: string;
  bgColor?: string;
  fgColor?: string;
  includeMargin?: boolean;
  renderAs?: 'canvas' | 'svg';
  size?: number;
}

const QRCodeComponent: FC<QRCodeComponentProps> = ({
  value,
  renderAs,
  size,
  bgColor,
  fgColor,
  includeMargin,
}) => (
  <QRCode
    value={value}
    renderAs={renderAs}
    size={size}
    bgColor={bgColor}
    fgColor={fgColor}
    includeMargin={includeMargin}
    level="M"
  />
);

export default QRCodeComponent;

QRCodeComponent.defaultProps = {
  renderAs: 'canvas',
  size: 0,
  bgColor: '#fff',
  fgColor: '#000',
  includeMargin: true,
};
