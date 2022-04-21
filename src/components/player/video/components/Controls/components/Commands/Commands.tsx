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

import { FC, memo } from 'react';
import { CONTROLS_BUTTONS } from 'configs/player';
import { IconButton as Icon } from 'components/iconButton';
import { Container, Group } from './Styles';

const ICON_BUTTON_SIZE = 69;

interface CommandsProps {
  isStream: boolean;
  paused: boolean;
}

const CommandsPure: FC<CommandsProps> = ({ paused, isStream }) => {
  const playPauseIconKey = paused ? 'play' : 'pause';

  return (
    <Container>
      <Group justifyContent="flex-start" />
      <Group justifyContent="center">
        {!isStream && (
          <>
            <Icon
              size={ICON_BUTTON_SIZE}
              icon={CONTROLS_BUTTONS.rewind.name}
              iconWidth={CONTROLS_BUTTONS.rewind.width}
              buttonLabel={CONTROLS_BUTTONS.rewind.label}
            />
            <Icon
              size={ICON_BUTTON_SIZE}
              icon={CONTROLS_BUTTONS[playPauseIconKey].name}
              iconWidth={CONTROLS_BUTTONS[playPauseIconKey].width}
              buttonLabel={CONTROLS_BUTTONS[playPauseIconKey].label}
              key={playPauseIconKey}
            />
            <Icon
              size={ICON_BUTTON_SIZE}
              icon={CONTROLS_BUTTONS.fastForward.name}
              iconWidth={CONTROLS_BUTTONS.fastForward.width}
              buttonLabel={CONTROLS_BUTTONS.fastForward.label}
            />
          </>
        )}
      </Group>
      <Group justifyContent="flex-end">
        <Icon
          size={ICON_BUTTON_SIZE}
          icon={CONTROLS_BUTTONS.exit.name}
          iconWidth={CONTROLS_BUTTONS.exit.width}
          buttonLabel={CONTROLS_BUTTONS.exit.label}
        />
      </Group>
    </Container>
  );
};

export const Commands = memo(CommandsPure);
