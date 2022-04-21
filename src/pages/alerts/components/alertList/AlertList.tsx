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

import { FC, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ALERT_LIST } from 'configs/ineractiveGroupViewId';
import { Alert } from 'types/Alert';
import { Command } from 'types/Command';
import { InteractiveGroup } from 'components/interactive';
import { AlertRenderer } from './components/alertRenderer';
import { Container, Wrapper } from './Styles';

interface Props {
  alertsList: Alert[];
  handleShowMore: () => void;
  itemSelectedCallback: (alert: Alert) => void;
  selectedAlert: Alert;
}

const handleCommands = [
  Command.ArrowUp,
  Command.ArrowDown,
  Command.ArrowLeft,
  Command.ArrowRight,
  Command.Enter,
];

export const AlertList: FC<Props> = ({
  alertsList,
  itemSelectedCallback,
  handleShowMore,
  selectedAlert,
}) => {
  const [selected, setSelected] = useState(0);
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);
  const alertListReversed = useMemo(() => [...alertsList], [alertsList]);
  const listRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    setSelected(alertsList.findIndex((a) => a === selectedAlert));
    setShouldPlayAnimation(false);
  }, [alertsList, selectedAlert]);

  const customHandlerIncrement = useCallback(() => {
    const newIndex = selected ? selected - 1 : 0;

    setShouldPlayAnimation(true);
    setSelected(newIndex);
    itemSelectedCallback(alertsList[newIndex]);
  }, [setShouldPlayAnimation, selected, alertsList, setSelected, itemSelectedCallback]);

  const customHandlerDecrement = useCallback(() => {
    const newIndex = (selected + 1) % alertsList.length;

    setShouldPlayAnimation(true);
    setSelected(newIndex);
    itemSelectedCallback(alertsList[newIndex]);
  }, [setShouldPlayAnimation, selected, alertsList, setSelected, itemSelectedCallback]);

  return (
    <InteractiveGroup
      viewId={ALERT_LIST}
      customHandlerUp={customHandlerDecrement}
      customHandlerDown={customHandlerIncrement}
      customEnterHandler={handleShowMore}
      setDirectionPriorityMount={Command.ArrowUp}
      setDirectionPriorityUnmount={Command.ArrowUp}
      handleCommands={handleCommands}
    >
      <Wrapper>
        <Container
          ref={listRef}
          data-test-id="alert-carousel"
          selected={selected}
          shouldPlayAnimation={shouldPlayAnimation}
          clientHeight={listRef?.current?.clientHeight || 0}
        >
          {alertListReversed.map((item) => (
            <AlertRenderer key={item?.id} selected={selectedAlert === item} {...item} />
          ))}
        </Container>
      </Wrapper>
    </InteractiveGroup>
  );
};
