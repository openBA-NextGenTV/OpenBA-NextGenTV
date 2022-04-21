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

import { FC, memo, useEffect, useState } from 'react';
import { SettingsElementProps } from 'pages/settings/components/settingsComponent';
import { ButtonBlue } from 'components/buttons';
import { Container, Title } from 'components/settings/components/zipCode/Styles';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

const PrivacyPolicyWidgetPure: FC<SettingsElementProps> = ({
  selected,
  active,
  setSettingsActiveGroup,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) setShow(true);
  }, [active]);

  const handleClose = () => {
    setShow(false);
    setSettingsActiveGroup();
  };

  return (
    <>
      {show && <PrivacyPolicyModal handleClose={handleClose} />}
      <Container data-test-id="privacy-policy-container" selected={selected}>
        <Title>Privacy Policy</Title>
        <ButtonBlue
          data-test-id="privacy-policy-button"
          text="view details"
          onClick={() => {
            setShow(true);
          }}
        />
      </Container>
    </>
  );
};

export const PrivacyPolicyWidget = memo(PrivacyPolicyWidgetPure);
