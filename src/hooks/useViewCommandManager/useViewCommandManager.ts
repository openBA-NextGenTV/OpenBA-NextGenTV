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

import { Command } from 'types/Command';
import { View, ViewId } from './types';
import { findViewPredicate } from './utils';

const registeredViews: View[] = [];

export const ARROWS: Command[] = [
  Command.ArrowUp,
  Command.ArrowDown,
  Command.ArrowLeft,
  Command.ArrowRight,
];

const ALL_COMMANDS: Command[] = [
  ...ARROWS,
  Command.Enter,
  Command.Backspace,
  Command.ColorF2Yellow,
];

const KEY_CODES_COMMANDS: { [key: number]: Command } = {
  8: Command.Backspace,
  13: Command.Enter,
  27: Command.Backspace,
  37: Command.ArrowLeft,
  38: Command.ArrowUp,
  39: Command.ArrowRight,
  40: Command.ArrowDown,
  461: Command.Backspace,
  405: Command.ColorF2Yellow,
};

const keydownHandler = (event: KeyboardEvent) => {
  let command: Command = event.code as Command;

  if (event.code === 'GoBack') {
    command = Command.Backspace;
  }

  if (!command) {
    // LG TV returns undefined for event.code
    // keyCode is only available option
    command = KEY_CODES_COMMANDS[event.keyCode];
  }

  if (ARROWS.includes(command)) {
    // workaround to prevent uncontrolled dom navigation that causes unexpected jumps in menu
    event.preventDefault();
  }

  if (ALL_COMMANDS.includes(command as Command)) {
    // if view has listener then listener could decide pass this command to the next listener or not.
    [...registeredViews]
      .reverse()
      .every((view) => (view.listener ? view.listener(command as Command) : false));
  }
};

document.addEventListener('keydown', keydownHandler);

export const registerView = (viewToRegister: View) => {
  const alreadyRegistered = registeredViews.find((view) => findViewPredicate(view, viewToRegister));

  if (alreadyRegistered) {
    alreadyRegistered.listener = viewToRegister.listener;
  } else if (viewToRegister.handlesAfterVies?.length) {
    const position = Math.min(
      ...viewToRegister.handlesAfterVies.map((_viewId) =>
        registeredViews.findIndex(({ viewId }) => viewId === _viewId)
      )
    );

    registeredViews.splice(position - 1, 0, viewToRegister);
  } else {
    registeredViews.push(viewToRegister);
  }
};

export const unregisterView = (viewToUnregister: ViewId) => {
  const view = registeredViews.find((registeredView) =>
    findViewPredicate(registeredView, viewToUnregister)
  );

  if (view) {
    registeredViews.splice(registeredViews.indexOf(view), 1);
  }
};
