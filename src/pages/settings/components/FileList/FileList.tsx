/*
 * Copyright © 2022 Sinclair Broadcast Group
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFileList } from 'hooks/useFileList';
import { fileListActions } from 'redux/slices/fileList';
import File from './File';
import { Column, Container, Header, Name, Title } from './FileList.styles';

function FileList() {
  const dispatch = useDispatch();
  const files = useFileList();

  useEffect(() => {
    dispatch(fileListActions.setFileViewerActive(true));

    return () => {
      dispatch(fileListActions.setFileViewerActive(false));
    };
  }, [dispatch]);

  return (
    <Container>
      <Title>Online File List</Title>

      <Header>
        <Name>Name</Name>
        <Column>Size</Column>
        <Column>Last Updated</Column>
      </Header>

      {files.map((file) => (
        <File key={file.hash} name={file.name} size={file.size} lastUpdated={file.lastUpdated} />
      ))}
    </Container>
  );
}

export default FileList;
