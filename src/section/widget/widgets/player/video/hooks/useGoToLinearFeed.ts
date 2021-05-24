import { useGetFlashChannelQuery } from '../../../../../../apollo/generated/graphql';
import { useMenusOperations, useWidgetOperations } from '../../../../../../state';
import { VideoPayload } from '../../types/Video.types';

export const useGoToLinearFeed = (payload: VideoPayload) => {
  const { data: channel } = useGetFlashChannelQuery();
  const { closeWidget } = useWidgetOperations();
  const { hideMenu } = useMenusOperations();

  const goToLinearFeed = () => {
    hideMenu();
    closeWidget();
  };

  if (payload && payload.isFlashChannel && !channel?.flashChannel.isLive) {
    goToLinearFeed();
  }

  return {};
};
