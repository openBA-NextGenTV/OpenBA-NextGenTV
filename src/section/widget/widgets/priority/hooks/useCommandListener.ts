import { useCallback, useEffect } from 'react';

import { Command, registerView, unregisterView } from '../../../../../hooks';
import { useWidgetOperations } from '../../../../../state';

export const useCommandListener = () => {
  const { closeWidget } = useWidgetOperations();

  const commandListener = useCallback(
    (command: Command) => {
      switch (command) {
        case 'Backspace':
        case 'ArrowLeft': {
          closeWidget();
          break;
        }
      }
    },
    [closeWidget],
  );

  useEffect(() => {
    registerView({ viewId: 'Priority', listener: commandListener });

    return () => unregisterView({ viewId: 'Priority' });
  }, [commandListener]);
};
