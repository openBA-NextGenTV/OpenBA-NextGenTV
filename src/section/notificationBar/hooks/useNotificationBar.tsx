import { useEffect, useState } from 'react';

import {
  useAlertsModel,
  useAlertsOperations,
  useDeviceInfoModel,
  useFlashChannelModel,
  useFlashChannelOperations,
  useMenusModel,
  useMenusOperations,
  useWidgetModel,
} from '../../../state';
import { NotificationProps } from '../Notification';
import { getAlertProps, getFlashChannelEndProps, getFlashChannelProps } from '../notification.util';

export const useNotificationBar = () => {
  const [notificationProps, setNotificationProps] = useState<null | NotificationProps>(null);
  const [isHiddenEndFlashChannelBar, setIsHiddenEndFlashChannelBar] = useState(false);

  const { alert } = useAlertsModel();
  const { hideAlert, showMore } = useAlertsOperations();
  const { hideFlashChannel, gotoChannel } = useFlashChannelOperations();
  const { flashChannel } = useFlashChannelModel();
  const { station } = useDeviceInfoModel();

  const { isVisible } = useMenusModel();
  const { widget } = useWidgetModel();

  const { disableMenu, enableMenu } = useMenusOperations();

  const hideEndFlashChannel = () => {
    setIsHiddenEndFlashChannelBar(true);
    setNotificationProps(null);
  };

  useEffect(() => {
    if (flashChannel?.isLive) {
      const flashChannelProps = getFlashChannelProps(flashChannel, hideFlashChannel, gotoChannel);
      setIsHiddenEndFlashChannelBar(false);
      setNotificationProps(flashChannelProps);
      disableMenu();
      return;
    }

    if (flashChannel && flashChannel?.expireTime && !isHiddenEndFlashChannelBar) {
      const endFlashChannelProps = getFlashChannelEndProps(hideEndFlashChannel, station, flashChannel.title);
      setNotificationProps(endFlashChannelProps);
      disableMenu();
      return;
    }

    if (alert) {
      const alertProps = getAlertProps(alert, hideAlert, showMore);
      setNotificationProps(alertProps);
      disableMenu();
      return;
    }

    enableMenu();
    setNotificationProps(null);
  }, [
    isVisible,
    station,
    widget,
    alert,
    flashChannel,
    isHiddenEndFlashChannelBar,
    gotoChannel,
    hideAlert,
    hideFlashChannel,
    showMore,
    disableMenu,
    enableMenu,
  ]);

  return {
    notificationProps,
  };
};
