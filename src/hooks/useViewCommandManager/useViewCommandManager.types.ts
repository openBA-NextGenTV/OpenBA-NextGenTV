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

export type Command = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Enter' | 'Backspace' | 'ColorF2Yellow';

/**
 * By default - listener handles command by itself and don't allow to pass it to another listener.
 * If you wish to pass it - you need to return explicitly "true" from the listener.
 */
export type CommandListener = (command: Command) => boolean | void;

export type View = {
  viewId: string;
  listener?: CommandListener;
};

export type ViewId = Pick<View, 'viewId'>;
