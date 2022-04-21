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

import * as S from './Styles';

export const MENU_ITEM_TITLE = 'menu-item-title';

export const categoryToTitleMap = {
  topStories: 'Top Stories',
  localNews: 'Local News',
  nationWorld: 'Nation & World',
  sports: 'Sports',
  entertainment: 'Entertainment',
  radio: 'Radio',
  weather: 'Weather',
};

export const categoryToContentMap = {
  topStories: <S.TitleText className={MENU_ITEM_TITLE}>top stories</S.TitleText>,

  localNews: <S.TitleText className={MENU_ITEM_TITLE}>local</S.TitleText>,

  nationWorld: (
    <>
      <S.TitleText textAlign="center">nation &</S.TitleText>
      <S.TitleText className={MENU_ITEM_TITLE} textAlign="center">
        world
      </S.TitleText>
    </>
  ),

  sports: <S.TitleText className={MENU_ITEM_TITLE}>sports</S.TitleText>,

  radio: <S.TitleText className={MENU_ITEM_TITLE}>radio</S.TitleText>,

  entertainment: (
    <S.TitleText className={MENU_ITEM_TITLE} fontSize={34}>
      entertainment
    </S.TitleText>
  ),

  weather: (
    <>
      <S.TitleText>Weather</S.TitleText>
      <S.TitleText className={MENU_ITEM_TITLE}>Videos</S.TitleText>
    </>
  ),
};
