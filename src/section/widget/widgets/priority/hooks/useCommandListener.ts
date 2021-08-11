import { useCallback, useEffect } from 'react';

import { Command, registerView, unregisterView } from '../../../../../hooks';
import { useMenusModel, useWidgetOperations } from '../../../../../state';

export const useCommandListener = () => {
  const { closeWidget } = useWidgetOperations();
  const { isDisable } = useMenusModel();

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
    if (isDisable) {
      unregisterView({ viewId: 'Priority' });
    } else {
      registerView({ viewId: 'Priority', listener: commandListener });
    }

    return () => unregisterView({ viewId: 'Priority' });
  }, [commandListener, isDisable]);
};
