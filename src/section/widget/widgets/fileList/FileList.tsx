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

import { useRef } from 'react';

import { useCommandScroll } from '../../../../hooks';
// import { File } from './file';
import { Container, Date, Header, Name, ScrollContainer, Size, Title } from './FileList.styles';

const VIEW_ID = 'fileList';

// should be uncommented when it will be implemented on the Platform side

export const FileList = () => {
  const fileListRef = useRef<HTMLDivElement>(null);

  useCommandScroll(fileListRef, VIEW_ID);

  // const { data: {files}, loading, error } = useNrtFallbackRequest(FILE_LIST_URL, FILE_LIST_URL, 'json', 'json');
  //
  // if (loading) {
  //   return <Styled.ContainerMessage>File list will update in a moment.</Styled.ContainerMessage>;
  // }
  //
  // if (error || !data) {
  //   return <Styled.ContainerMessage>File list is not available.</Styled.ContainerMessage>;
  // }

  return (
    <Container>
      <Title>File List</Title>

      <Header>
        <Name>Name</Name>
        <Size>Size</Size>
        <Date>Date</Date>
      </Header>

      <ScrollContainer ref={fileListRef}>
        {/*{files?.map((file: File, index: number) => (*/}
        {/*  <File key={index} {...file} />*/}
        {/*))}*/}
      </ScrollContainer>
    </Container>
  );
};
