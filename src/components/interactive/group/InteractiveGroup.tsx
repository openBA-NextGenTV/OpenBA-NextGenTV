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

/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props, no-nested-ternary, react/function-component-definition, @typescript-eslint/no-unused-expressions, react-hooks/exhaustive-deps, default-case, @typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow
 */
import {
  Children as ReactChildren,
  cloneElement,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ARROWS, registerView, unregisterView } from 'hooks/useViewCommandManager';
import { Command } from 'types/Command';
import { v4 as uuidv4 } from 'uuid';
import { Context, ElementConfig, InteractiveGroupContext } from './contex';

enum Direction {
  Forward = 'forward',
  Back = 'back',
}

export interface InteractiveGroupProps {
  viewId: string;
  customBackHandler?: () => void;
  customEnterHandler?: () => void;
  customHandlerDown?: () => void;
  customHandlerLeft?: () => void;
  customHandlerRight?: () => void;
  customHandlerUp?: () => void;
  groupActive?: boolean;
  handleCommands?: Command[];
  handlesAfterVies?: Array<string>;
  ignoreDirection?: boolean;
  infinityScrollSetting?: Command[];
  initialHighlight?: boolean;
  isUnique?: boolean;
  setDirectionPriorityMount?: Command | null;
  setDirectionPriorityUnmount?: Command | null;
  setSavedIndex?: (index: number) => void;
  useSavedIndex?: boolean;
}

const savedStates = new Map<string, number>();
let prioritySaved: Command | null = null;

const resetFocus = (element: ElementConfig) =>
  element.state === 'disabled' ? undefined : element.setState('normal');

// storing all registered elements
const allRegisteredElements: ElementConfig[][] = [];

// setting normal state to all elements specially for click events
export const setAllElementsUnselected = () => {
  allRegisteredElements.forEach((registeredElements: ElementConfig[]) =>
    registeredElements.forEach(resetFocus)
  );
};

const getNextElement = (
  currentSelected: number,
  direction: Direction,
  elements: ElementConfig[],
  command: Command,
  infinityScrollSetting: typeof ARROWS[number][]
): number => {
  const canScroll = infinityScrollSetting.some((arrowCommand) => arrowCommand === command);
  let nextElementIndex = currentSelected;

  if (direction === 'forward') {
    nextElementIndex =
      currentSelected === elements.length - 1
        ? canScroll
          ? 0
          : currentSelected
        : currentSelected + 1;
  } else {
    nextElementIndex =
      currentSelected === 0
        ? canScroll
          ? elements.length - 1
          : currentSelected
        : currentSelected - 1;
  }

  return elements[nextElementIndex].state === 'disabled'
    ? getNextElement(nextElementIndex, direction, elements, command, infinityScrollSetting)
    : nextElementIndex;
};

interface InteractiveGroupInterface extends FC<InteractiveGroupProps> {
  getSavedState: (viewId: string) => number;
  hasPriority: (commands: Command[]) => boolean;
}

export const InteractiveGroup: InteractiveGroupInterface = ({
  viewId,
  handleCommands,
  isUnique,
  children,
  setDirectionPriorityMount,
  setDirectionPriorityUnmount,
  initialHighlight,
  useSavedIndex = true,
  customHandlerUp,
  customHandlerDown,
  customHandlerLeft,
  customHandlerRight,
  customEnterHandler,
  customBackHandler,
  setSavedIndex,
  handlesAfterVies = [],
  groupActive = true,
  infinityScrollSetting = [...ARROWS],
  ignoreDirection = false,
}) => {
  const selectedElementIndexRef = useRef<number>(0);
  const registeredElements = useRef<ElementConfig[]>([]);

  allRegisteredElements.push(registeredElements.current);

  // if component need to be focused on first render set initialHighlight true
  if (initialHighlight && !savedStates.has(viewId)) {
    savedStates.set(viewId, selectedElementIndexRef.current);
  }

  const registerComponent = useCallback(
    (elementConfig: ElementConfig) => {
      const [elements] = [registeredElements.current];
      const configIndex = elements.findIndex(({ setState }) => elementConfig.setState === setState);

      if (configIndex !== -1) {
        elements.splice(configIndex, 1, elementConfig);

        return;
      }

      elements.push(elementConfig);
    },
    [registeredElements]
  );

  const [context] = useState<InteractiveGroupContext>(() => ({
    registerElement: registerComponent,
  }));

  useEffect(() => {
    if (!useSavedIndex) {
      return;
    }

    const savedIndex = savedStates.get(viewId);

    if (typeof savedIndex === 'number' && registeredElements.current?.length > savedIndex) {
      if (prioritySaved && handleCommands?.includes(prioritySaved)) {
        registeredElements.current[savedIndex].setState('selected');
      }

      selectedElementIndexRef.current = savedIndex;
      setSavedIndex && setSavedIndex(savedIndex);
    }
  }, []);

  const commandListener = useCallback(
    (command: Command) => {
      if (!groupActive) {
        return true;
      }

      const elements = registeredElements.current;
      const selectedElementIndex = selectedElementIndexRef.current;
      let next = selectedElementIndex;
      const hasPriority = prioritySaved && handleCommands?.includes(prioritySaved);
      const commandHandled = handleCommands?.some((commandItem) => command === commandItem);

      const directionListener = Boolean(
        command !== Command.Enter &&
          command !== Command.Backspace &&
          commandHandled &&
          !ignoreDirection
      );

      if (commandHandled && hasPriority) {
        switch (command) {
          case Command.ArrowUp: {
            if (customHandlerUp) {
              customHandlerUp();
            }

            if (elements.length) {
              next = getNextElement(
                selectedElementIndex,
                Direction.Back,
                elements,
                command,
                infinityScrollSetting
              );
            }

            break;
          }

          case Command.ArrowDown: {
            if (customHandlerDown) {
              customHandlerDown();
            }

            if (elements.length) {
              next = getNextElement(
                selectedElementIndex,
                Direction.Forward,
                elements,
                command,
                infinityScrollSetting
              );
            }

            break;
          }

          case Command.ArrowLeft: {
            if (customHandlerLeft) {
              customHandlerLeft();
            }

            if (elements.length) {
              next = getNextElement(
                selectedElementIndex,
                Direction.Back,
                elements,
                command,
                infinityScrollSetting
              );
            }

            break;
          }

          case Command.ArrowRight: {
            if (customHandlerRight) {
              customHandlerRight();
            }

            if (elements.length) {
              next = getNextElement(
                selectedElementIndex,
                Direction.Forward,
                elements,
                command,
                infinityScrollSetting
              );
            }

            break;
          }

          case Command.Backspace: {
            if (customBackHandler) {
              customBackHandler();
            }

            break;
          }

          case Command.Enter:
            if (customEnterHandler) {
              customEnterHandler();
            } else {
              elements.length && elements[selectedElementIndex].onClick();
            }

            break;
        }
      }

      if (directionListener && elements.length) {
        setAllElementsUnselected();

        if (elements[next].state === 'disabled') {
          next = getNextElement(
            selectedElementIndex,
            Direction.Forward,
            elements,
            command,
            infinityScrollSetting
          );
        }

        elements[next].setState('selected');
        savedStates.set(viewId, next);
        selectedElementIndexRef.current = next;
      }

      if (directionListener) {
        prioritySaved = command;
      }

      return !commandHandled || !isUnique;
    },
    [
      groupActive,
      customHandlerUp,
      customHandlerDown,
      customHandlerLeft,
      customHandlerRight,
      customEnterHandler,
      viewId,
      children,
      ignoreDirection,
    ]
  );

  useEffect(() => {
    registerView({
      viewId,
      listener: commandListener,
      handlesAfterVies,
    });
  }, [commandListener]);

  useEffect(() => {
    if (setDirectionPriorityMount !== undefined) {
      // workaround bug => without setTimeOut fires before command listeners of previous page,
      // will be removed after we find where is the problem.
      prioritySaved = setDirectionPriorityMount;

      setTimeout(() => {
        prioritySaved = setDirectionPriorityMount;

        if (initialHighlight) {
          setAllElementsUnselected();

          registeredElements.current[selectedElementIndexRef.current]?.setState('selected');
        }
      }, 0);
    }

    return () => {
      unregisterView({ viewId });

      if (setDirectionPriorityUnmount !== undefined) {
        // workaround bug => without setTimeOut fires before command listeners of previous page,
        // will be removed after we find where is the problem.
        prioritySaved = setDirectionPriorityUnmount;

        setTimeout(() => {
          prioritySaved = setDirectionPriorityUnmount;
        }, 0);
      }
    };
  }, [groupActive]);

  // base idea of this block is connect click events to navigation handlers, selecting active element, and unselecting all others
  //  more deeply : we cloning react children and extending onClick
  //  we generating uuid to use it as reference to find element in array of element and handle selection and click logic.

  const cloneExtended = useMemo(
    () =>
      ReactChildren.map(
        children,
        (item: any, index) =>
          item &&
          cloneElement(item, {
            onClick: () => {
              const { uuid } = cloneExtended[index].props;

              registeredElements.current.forEach(resetFocus);

              const element = registeredElements.current.find((element) => element.uuid === uuid);

              setAllElementsUnselected();
              element?.setState('selected');
              setSavedIndex && setSavedIndex(index);
              item.props.onClick && item.props.onClick();
              savedStates.set(viewId, index);
              selectedElementIndexRef.current = index;

              prioritySaved =
                handleCommands?.find(
                  (command) => command !== Command.Enter && command !== Command.Backspace
                ) || prioritySaved;
            },
            uuid: item.props.uuid || uuidv4(),
          })
      ),
    [commandListener]
  );

  return <Context.Provider value={context}>{cloneExtended}</Context.Provider>;
};

InteractiveGroup.getSavedState = (viewId: string) => savedStates.get(viewId) || 0;

InteractiveGroup.hasPriority = (commands) => {
  if (prioritySaved === null) return false;

  return commands.includes(prioritySaved);
};
