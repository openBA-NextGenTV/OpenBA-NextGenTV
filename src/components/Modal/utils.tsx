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

import { RefObject } from 'react';
import { NavBar, NavIcons } from 'components/Navigation/navigation';
import { SUPPORTED_VIDEO_FORMATS } from 'utils/constants';
import { getFileExtensionFromUrl } from 'utils/fileHelpers';

export const prepareText = (text: string | string[], textFromNewLine?: boolean) => {
  let htmlString = '';
  let textFromArray;

  if (Array.isArray(text)) {
    if (textFromNewLine) {
      textFromArray = text.flatMap((textItem) => ['\u00A0', textItem]).slice(1);
    }

    textFromArray = textFromArray || text;

    textFromArray.forEach((textItem) => {
      htmlString += `<p>${textItem}<p/>`;
    });
  } else {
    htmlString += text;
  }

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export const textScrollUp = (textContainer: RefObject<HTMLDivElement>) => {
  let currentScroll = textContainer.current?.scrollTop || 0;

  const scrollElementTo = () => {
    textContainer.current?.scrollTo({
      top: currentScroll,
      behavior: 'smooth',
    });
  };

  currentScroll = currentScroll >= 100 ? (currentScroll -= 100) : 0;
  scrollElementTo();
};

export const textScrollDown = (textContainer: RefObject<HTMLDivElement>) => {
  let currentScroll = textContainer.current?.scrollTop || 0;

  const scrollElementTo = () => {
    textContainer.current?.scrollTo({
      top: currentScroll,
      behavior: 'smooth',
    });
  };

  currentScroll += 100;
  scrollElementTo();
};

export const isSupportedVideo = (mediaUrl: string) => {
  const mediaExtension = getFileExtensionFromUrl(mediaUrl);

  return mediaExtension && SUPPORTED_VIDEO_FORMATS.includes(mediaExtension);
};

export const resolveNavBar = (media: string) => {
  const navItems = [
    { text: 'details', icon: NavIcons.Vertically },
    { text: 'exit', icon: NavIcons.Back },
  ];

  if (!media) return <NavBar items={navItems} />;

  navItems.unshift({ text: 'media', icon: NavIcons.Horizontally });

  if (isSupportedVideo(media)) navItems.unshift({ text: 'play/pause', icon: NavIcons.Ok });

  return <NavBar items={navItems} />;
};
