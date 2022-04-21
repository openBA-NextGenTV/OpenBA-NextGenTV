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

import styled from 'styled-components';
import { convertPxToVh, convertPxToVw, minSize } from 'styles/responsive.mixins';

const Container = styled.div`
  position: fixed;
  left: 120px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 1;
  width: 550px;
  padding: 55px 45px 15px 45px;

  border-radius: 40px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.35), inset -5px 6px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(180deg, rgba(32, 32, 32, 0.85) 90.62%, rgba(47, 47, 47, 0.85) 100%);
`;

const Controls = styled.div`
  width: 300px;
  height: 100px;
  background-color: #563e3e;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 36px;
  line-height: 43px;
  padding-bottom: 40px;

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

const NavContainer = styled.div<{ fontSize?: number }>`
  color: #e5e5e5;
  font-weight: bold;
  text-transform: uppercase;
  ${({ fontSize = 24 }) =>
    minSize('font-size', `${convertPxToVw(fontSize)}`, `${convertPxToVh(fontSize)}`)};
`;

const NavItem = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
  grid-column-gap: 5px;
  align-items: center;
  margin-bottom: 10px;
`;

const NavIcon = styled.div`
  text-align: right;
`;

const NavText = styled.span`
  min-width: max-content;
  margin: 0 0.2vw;
`;

export { Container, Controls, Title, NavContainer, NavItem, NavIcon, NavText };
