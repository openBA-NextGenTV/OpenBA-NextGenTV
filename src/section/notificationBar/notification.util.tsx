import { getAlertBgColor, getAlertIconPath } from '../../apollo/alerts/alertProps';
import { Alert, FlashChannel } from '../../apollo/generated/graphql';

export const getFlashChannelProps = (
  flashChannel: FlashChannel,
  hideFlashChannel: (flashChannel: FlashChannel) => void,
  gotoChannel: (flashChannel: FlashChannel) => void,
) => ({
  content: `“${flashChannel.title}” is currently available. Please choose “Go to Channel” to view the channel with more information.`,
  variant: '#00468d',
  iconPath: 'icons/alert/Live.svg',
  showMoreButtonVisible: true,
  showMoreButtonLabel: 'Go To Channel',
  onHideBar: () => hideFlashChannel(flashChannel),
  onShowMore: () => gotoChannel(flashChannel),
});

export const getFlashChannelEndProps = (hideEndFlashChannel: () => void, station: string, title: string) => ({
  variant: '#00468d',
  content: `The “${title}” has ended. You are now watching ${station}.`,
  iconPath: 'icons/exclamation-flash-channel-end.svg',
  showMoreButtonVisible: false,
  onHideBar: () => {
    hideEndFlashChannel();
  },
});

export const getAlertProps = (alert: Alert, hideAlert: (alert: Alert) => void, showMore: (alert: Alert) => void) => {
  const TITLE_SEPARATOR = ': ';
  const SEGMENTS_SEPARATOR = '     ';
  const contentArray = [];

  const prepareAlertFragment = (title: string, text: string) => {
    if (title && text) {
      return `${title}${TITLE_SEPARATOR}${text}`;
    }

    return title || text;
  };

  contentArray.push(prepareAlertFragment(alert.menuTitle, alert.alertBarTitle));
  alert.pages.forEach(page => contentArray.push(prepareAlertFragment(page.title, page.story)));

  const content = contentArray.join(SEGMENTS_SEPARATOR).replace(/\n|\r/g, ' ').trim();

  return {
    variant: getAlertBgColor(alert.eventCode),
    content,
    iconPath: getAlertIconPath(alert.eventCode),
    showMoreButtonVisible: !!alert.pages.length,
    showMoreButtonLabel: 'Show More',
    onHideBar: () => hideAlert(alert),
    onShowMore: () => showMore(alert),
  };
};
