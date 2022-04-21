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

import styled, { css } from 'styled-components';

const positionMixin = css`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  ${positionMixin};
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const Modal = styled.div<{ color?: string }>`
  position: absolute;
  ${positionMixin};
  margin: auto;
  height: fit-content;
  width: fit-content;
  overflow: hidden;
  border: 3px solid #ffffff;
  border-radius: 40px;
  box-shadow: 2px 4px 25px 0 rgba(0, 0, 0, 0.08);
  background: ${({ color }) => color || 'transparent'};
`;

const ModalContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2em;
`;

const ModalTextContainerWrapper = styled.div<{
  withMedia?: boolean;
}>`
  width: ${({ withMedia }) => (withMedia ? '453px' : '1706px')};
  height: ${({ withMedia }) => (withMedia ? '692px' : '692px')};
  padding: ${({ withMedia }) => (withMedia ? '10' : '30')}px;
  font-size: ${({ withMedia }) => (withMedia ? '24' : '36')}px;
  line-height: ${({ withMedia }) => (withMedia ? '27' : '37')}px;
  font-weight: bold;
  background: #2e2d2e;
  box-shadow: inset 8px 8px 8px rgba(0, 0, 0, 0.65);
  border-radius: 20px;
`;

const ModalTextContainer = styled.div`
  height: 100%;
  padding: 15px;
  word-break: break-word;
  letter-spacing: -0.02em;
  color: #ffffff;
  overflow-y: auto;
  white-space: pre-wrap;
  //scroll styles
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-button,
  ::-webkit-resizer {
    width: 0;
  }
  ::-webkit-scrollbar-thumb {
    width: 0;
    border-radius: 26px;
    border: 2px solid #ffffff;
  }
  ::-webkit-scrollbar-track {
    //box-shadow is not same as design
    background-image: linear-gradient(to right, #2e2d2e 4px, black 2px, #2e2d2e, #2e2d2e);
    background-repeat: repeat-y;
    background-size: contain;
  }
`;

const displayMixin = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalMenuWrapper = styled.div`
  ${displayMixin};
  margin: 20px;
`;

const ModalIconWrapper = styled.div`
  ${displayMixin};
  margin: 2vh;
`;

export {
  ModalOverlay,
  Modal,
  ModalContentContainer,
  ModalMenuWrapper,
  ModalIconWrapper,
  ModalTextContainerWrapper,
  ModalTextContainer,
};
