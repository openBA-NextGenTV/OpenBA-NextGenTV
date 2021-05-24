import { useNotificationBar } from './hooks/useNotificationBar';
import { Notification } from './Notification';

export const NotificationBar = () => {
  const { notificationProps } = useNotificationBar();

  if (!notificationProps) {
    return null;
  }

  return <Notification {...notificationProps} />;
};
