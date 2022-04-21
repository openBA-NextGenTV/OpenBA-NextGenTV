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

import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { GaAction } from 'types/GA';

const QUARTILE_PROGRESS = 25;

const useGAvideoProgress = (
  category: string | undefined,
  title: string | undefined,
  progress: number
) => {
  const [trackedTitle, setTrackedTitle] = useState('');
  const [trackedProgress, setTrackedProgress] = useState(progress);

  useEffect(() => {
    if (!category || !trackedTitle || trackedTitle !== title) return;

    const quartileCount = Math.trunc(progress / QUARTILE_PROGRESS);
    const quartileProgress = quartileCount * QUARTILE_PROGRESS;
    const label = `${trackedTitle} - ${quartileProgress}%`;

    if (quartileProgress > trackedProgress) {
      ReactGA.event({
        category,
        action: GaAction.Play,
        label,
      });

      setTrackedProgress(quartileProgress);
    }
  }, [trackedTitle, progress, trackedProgress, title, category]);

  useEffect(() => {
    if (!category || !title) return;

    if (trackedTitle !== title) {
      ReactGA.event({ category, action: GaAction.Play, label: title });
      setTrackedProgress(0);
      setTrackedTitle(title);
    }
  }, [category, title, trackedTitle]);
};

export { useGAvideoProgress };
