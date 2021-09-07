/*
 * Copyright 2021 OpenBA-NextGenTV Contributors (https://OpenBA-NextGenTV.tech)
 * Copyright 2021 Sinclair Broadcast Group, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FC } from 'react';

import { getExtension } from '../../../../../../../utils/filte.utils';
import { useControlPlayPauseVideo } from './hooks/useControlPlayPauseVideo';
import { Image, MediaContainer, Video } from './Styles';

interface Props {
  mediaUrl: string;
  pageActive: boolean;
  setPageActive: (a: boolean) => void;
}

const SUPPORTED_VIDEO_FORMATS = ['mp4'];

export const MediaResolver: FC<Props> = ({ mediaUrl, pageActive, setPageActive }) => {
  const mediaExtension = getExtension(mediaUrl);
  const { videoRef, mediaClickHandler } = useControlPlayPauseVideo(pageActive, setPageActive);

  if (SUPPORTED_VIDEO_FORMATS.includes(mediaExtension)) {
    return (
      <MediaContainer>
        <Video
          id="alert_details_page_video"
          onClick={mediaClickHandler}
          ref={videoRef}
          autoPlay
          src={mediaUrl}
          selected={pageActive}
        />
      </MediaContainer>
    );
  }

  return (
    <MediaContainer>
      <Image id="alert_details_page_img" onClick={mediaClickHandler} src={mediaUrl} selected={pageActive} />{' '}
    </MediaContainer>
  );
};
