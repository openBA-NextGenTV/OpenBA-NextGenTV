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

import { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HOME } from 'configs/ineractiveGroupViewId';
import { ctaSelectors } from 'redux/slices/cta';
import { hideCta } from 'redux/slices/cta/reducer';
import { ALERTS, MENU } from 'routes';
import { Command } from 'types/Command';
import { GaAction } from 'types/GA';
import { InteractiveGroup } from 'components/interactive';
import Cta from './components/CallToAction';

const handleCommands = [Command.ArrowLeft, Command.ArrowRight, Command.Enter, Command.Backspace];

export function Home() {
  const ctaVisible = useSelector(ctaSelectors.getCtaVisible);
  const [appStart] = useState(ctaVisible);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appStart) ReactGA.event({ category: 'App', action: GaAction.Close });
  }, [appStart]);

  const closeCta = useCallback(() => {
    dispatch(hideCta());
  }, [dispatch]);

  const customHandlerRight = () => {
    closeCta();
    navigate(`${MENU}?BottomMenu=feeds`);
  };

  const customHandlerLeft = () => {
    closeCta();
    navigate(ALERTS);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => closeCta(), 10000);

    return () => clearTimeout(timeOut);
  }, [closeCta]);

  return (
    <InteractiveGroup
      viewId={HOME}
      handleCommands={handleCommands}
      setDirectionPriorityMount={Command.ArrowRight}
      customHandlerLeft={customHandlerLeft}
      customHandlerRight={customHandlerRight}
      customBackHandler={closeCta}
    >
      {ctaVisible ? <Cta /> : null}
    </InteractiveGroup>
  );
}
