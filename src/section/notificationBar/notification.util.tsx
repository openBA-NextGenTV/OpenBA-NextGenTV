import { Alert, FlashChannel } from '../../apollo/generated/graphql';
import { getAlertNotificationBgColor, getAlertNotificationIconPath } from './alertNotificationsProps';
import { Icon, Live } from './NotificationBar.styles';

export const getFlashChannelProps = (
  flashChannel: FlashChannel,
  hideFlashChannel: (flashChannel: FlashChannel) => void,
  gotoChannel: (flashChannel: FlashChannel) => void,
) => ({
  content: `“${flashChannel.title}” is currently available. Please choose “Go to Channel” to view the channel with more information.`,
  variant: '#00468d',
  showMoreButtonVisible: true,
  showMoreButtonLabel: 'Go To Channel',
  onHideBar: () => hideFlashChannel(flashChannel),
  onShowMore: () => gotoChannel(flashChannel),
  renderIcon: function renderIcon() {
    return <Live>Live</Live>;
  },
});

export const getFlashChannelEndProps = (hideEndFlashChannel: () => void, station: string, title: string) => ({
  variant: '#00468d',
  content: `The “${title}” has ended. You are now watching ${station}.`,
  showMoreButtonVisible: false,
  onHideBar: () => {
    hideEndFlashChannel();
  },
  renderIcon: function renderIcon() {
    return <Icon iconPath={'icons/exclamation-flash-channel-end.svg'} />;
  },
});

export const getAlertProps = (alert: Alert, hideAlert: (alert: Alert) => void, showMore: (alert: Alert) => void) => ({
  variant: getAlertNotificationBgColor(alert.eventCode),
  content: alert.alertBarTitle,
  showMoreButtonVisible: !!alert.pages.length,
  showMoreButtonLabel: 'Show More',
  onHideBar: () => hideAlert(alert),
  onShowMore: () => showMore(alert),
  renderIcon: function renderIcon() {
    return <Icon iconPath={getAlertNotificationIconPath(alert.eventCode)} />;
  },
});
