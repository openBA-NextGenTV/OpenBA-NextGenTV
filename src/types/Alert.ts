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

import { AlertPriority } from 'pages/alerts/types';

type AEATmedia = {
  url: string;
  alternateUrl?: string;
  contentLength?: number;
  contentType?: string;
  lang?: number;
  mediaAssoc?: string;
  mediaDesc?: string;
  mediaType?: string;
};

type Page = {
  id: string;
  story: string;
  title: string;
  mediaUrl?: string;
};

type Media = {
  alternateUrl: string;
  contentLength: string;
  url: string;
};

enum AlertState {
  ALERT = 'alert',
  NEW = 'new',
  UPDATE = 'update',
  CANCEL = 'cancel',
}

enum AlertInformation {
  Image = 'AlertInformationImage',
  Video = 'AlertInformationVideo',
  QRCode = 'AlertInformationQRCode',
}

type Alert = {
  aeatMedia: AEATmedia[];
  bgColor: string;
  eventCode: string;
  expire: number;
  iconName: string;
  id: string;
  latestPublishTime: number;
  medias: Media[];
  message: string;
  pages: Array<Page>;
  priority: number;
  status: AlertState;
  targets: string[];
  title: string;
  wasPatchedWithNRT: boolean;
  tinyUrl?: string;
};

export { AlertState, AlertPriority, AlertInformation };
export type { AEATmedia, Page, Alert, Media };
