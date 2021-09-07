/*
 * Copyright 2021 OpenBA-NextGenTV Contributors (https://OpenBA-NextGenTV.tech)
 * Copyright 2021 Sinclair Broadcast Group, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Command, View, ViewId } from './useViewCommandManager.types';
import { findViewPredicate } from './useViewCommandManager.utils';

const registeredViews: View[] = [];

const ARROWS: Command[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const ALL_COMMANDS: Command[] = [...ARROWS, 'Enter', 'Backspace', 'ColorF2Yellow'];

const KEY_CODES_COMMANDS: { [key: number]: Command } = {
  8: 'Backspace',
  13: 'Enter',
  27: 'Backspace',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  461: 'Backspace',
  405: 'ColorF2Yellow',
};

const keydownHandler = (event: KeyboardEvent) => {
  let command: Command = event.code as Command;

  if (event.code === 'GoBack') {
    command = 'Backspace';
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
    [...registeredViews].reverse().every(view => (view.listener ? view.listener(command as Command) : false));
  }
};

document.addEventListener('keydown', keydownHandler);

export const registerView = (viewToRegister: View) => {
  const alreadyRegistered = registeredViews.find(view => findViewPredicate(view, viewToRegister));

  if (alreadyRegistered) {
    alreadyRegistered.listener = viewToRegister.listener;
  } else {
    registeredViews.push(viewToRegister);
  }
};

export const unregisterView = (viewToUnregister: ViewId) => {
  const view = registeredViews.find(view => findViewPredicate(view, viewToUnregister));

  if (view) {
    registeredViews.splice(registeredViews.indexOf(view), 1);
  }
};
