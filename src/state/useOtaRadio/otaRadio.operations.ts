import { useCallback } from 'react';
import { useSetStationMutation } from 'src/apollo/generated/graphql';

export const useOtaRadioOperations = () => {
  const [setChannelToReturn] = useSetStationMutation();

  const setStation = useCallback(
    (channelId: string) => {
      return setChannelToReturn({
        variables: { station: channelId },
      });
    },
    [setChannelToReturn],
  );

  return [setStation];
};
