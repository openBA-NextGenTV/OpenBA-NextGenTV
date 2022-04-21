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

import { ReactNode } from 'react';
import { ReactComponent as ADR } from 'assets/icons/alert/ADR.svg';
import { ReactComponent as AVA } from 'assets/icons/alert/AVA.svg';
import { ReactComponent as AVW } from 'assets/icons/alert/AVW.svg';
import { ReactComponent as BLU } from 'assets/icons/alert/BLU.svg';
import { ReactComponent as BZW } from 'assets/icons/alert/BZW.svg';
import { ReactComponent as CAE } from 'assets/icons/alert/CAE.svg';
import { ReactComponent as CFA } from 'assets/icons/alert/CFA.svg';
import { ReactComponent as CFW } from 'assets/icons/alert/CFW.svg';
import { ReactComponent as DMO } from 'assets/icons/alert/DMO.svg';
import { ReactComponent as DSW } from 'assets/icons/alert/DSW.svg';
import { ReactComponent as EAN } from 'assets/icons/alert/EAN.svg';
import { ReactComponent as EQW } from 'assets/icons/alert/EQW.svg';
import { ReactComponent as EVI } from 'assets/icons/alert/EVI.svg';
import { ReactComponent as EWW } from 'assets/icons/alert/EWW.svg';
import { ReactComponent as ExclamationBlue } from 'assets/icons/alert/exclamation-blue.svg';
import { ReactComponent as ExclamationOrange } from 'assets/icons/alert/exclamation-orange.svg';
import { ReactComponent as ExclamationRed } from 'assets/icons/alert/exclamation-red.svg';
import { ReactComponent as FFS } from 'assets/icons/alert/FFS.svg';
import { ReactComponent as FRW } from 'assets/icons/alert/FRW.svg';
import { ReactComponent as HLS } from 'assets/icons/alert/HLS.svg';
import { ReactComponent as HMW } from 'assets/icons/alert/HMW.svg';
import { ReactComponent as HUA } from 'assets/icons/alert/HUA.svg';
import { ReactComponent as HUW } from 'assets/icons/alert/HUW.svg';
import { ReactComponent as HWA } from 'assets/icons/alert/HWA.svg';
import { ReactComponent as HWW } from 'assets/icons/alert/HWW.svg';
import { ReactComponent as LEW } from 'assets/icons/alert/LEW.svg';
import { ReactComponent as NUW } from 'assets/icons/alert/NUW.svg';
import { ReactComponent as RHW } from 'assets/icons/alert/RHW.svg';
import { ReactComponent as SMW } from 'assets/icons/alert/SMW.svg';
import { ReactComponent as SPS } from 'assets/icons/alert/SPS.svg';
import { ReactComponent as SPW } from 'assets/icons/alert/SPW.svg';
import { ReactComponent as SSA } from 'assets/icons/alert/SSA.svg';
import { ReactComponent as SSW } from 'assets/icons/alert/SSW.svg';
import { ReactComponent as SVA } from 'assets/icons/alert/SVA.svg';
import { ReactComponent as SVR } from 'assets/icons/alert/SVR.svg';
import { ReactComponent as SVS } from 'assets/icons/alert/SVS.svg';
import { ReactComponent as TOA } from 'assets/icons/alert/TOA.svg';
import { ReactComponent as TOE } from 'assets/icons/alert/TOE.svg';
import { ReactComponent as TOR } from 'assets/icons/alert/TOR.svg';
import { ReactComponent as TRA } from 'assets/icons/alert/TRA.svg';
import { ReactComponent as TRW } from 'assets/icons/alert/TRW.svg';
import { ReactComponent as TSA } from 'assets/icons/alert/TSA.svg';
import { ReactComponent as TSW } from 'assets/icons/alert/TSW.svg';
import { ReactComponent as VOW } from 'assets/icons/alert/VOW.svg';
import { ReactComponent as WSA } from 'assets/icons/alert/WSA.svg';
import { ReactComponent as WSW } from 'assets/icons/alert/WSW.svg';
import * as S from 'components/Icon/styles';
import { AlertCode, IAlertIconProps } from './types';

const ALERT_CODE_ICON_MAP: Record<AlertCode, ReactNode> = {
  [AlertCode.ADR]: <ADR />,
  [AlertCode.NIC]: <ADR />,
  [AlertCode.NMN]: <ADR />,
  [AlertCode.AVA]: <AVA />,
  [AlertCode.AVW]: <AVW />,
  [AlertCode.BLU]: <BLU />,
  [AlertCode.BZW]: <BZW />,
  [AlertCode.CAE]: <CAE />,
  [AlertCode.CFA]: <CFA />,
  [AlertCode.FFA]: <CFA />,
  [AlertCode.FLA]: <CFA />,
  [AlertCode.CFW]: <CFW />,
  [AlertCode.FFW]: <CFW />,
  [AlertCode.FLW]: <CFW />,
  [AlertCode.DMO]: <DMO />,
  [AlertCode.NPT]: <DMO />,
  [AlertCode.RMT]: <DMO />,
  [AlertCode.RWT]: <DMO />,
  [AlertCode.DSW]: <DSW />,
  [AlertCode.EAN]: <EAN />,
  [AlertCode.CDW]: <EAN />,
  [AlertCode.CEM]: <EAN />,
  [AlertCode.LAE]: <EAN />,
  [AlertCode.EQW]: <EQW />,
  [AlertCode.EVI]: <EVI />,
  [AlertCode.EWW]: <EWW />,
  [AlertCode.FFS]: <FFS />,
  [AlertCode.FLS]: <FFS />,
  [AlertCode.FRW]: <FRW />,
  [AlertCode.HLS]: <HLS />,
  [AlertCode.HMW]: <HMW />,
  [AlertCode.HUA]: <HUA />,
  [AlertCode.HUW]: <HUW />,
  [AlertCode.HWA]: <HWA />,
  [AlertCode.HWW]: <HWW />,
  [AlertCode.LEW]: <LEW />,
  [AlertCode.NUW]: <NUW />,
  [AlertCode.RHW]: <RHW />,
  [AlertCode.SMW]: <SMW />,
  [AlertCode.SPS]: <SPS />,
  [AlertCode.SPW]: <SPW />,
  [AlertCode.SSA]: <SSA />,
  [AlertCode.SSW]: <SSW />,
  [AlertCode.SVA]: <SVA />,
  [AlertCode.SVR]: <SVR />,
  [AlertCode.SVS]: <SVS />,
  [AlertCode.TOA]: <TOA />,
  [AlertCode.TOE]: <TOE />,
  [AlertCode.TOR]: <TOR />,
  [AlertCode.TRA]: <TRA />,
  [AlertCode.TRW]: <TRW />,
  [AlertCode.TSA]: <TSA />,
  [AlertCode.TSW]: <TSW />,
  [AlertCode.VOW]: <VOW />,
  [AlertCode.WSA]: <WSA />,
  [AlertCode.WSW]: <WSW />,
  [AlertCode.BHW]: <ExclamationRed />,
  [AlertCode.BNF]: <ExclamationRed />,
  [AlertCode.BWW]: <ExclamationRed />,
  [AlertCode.CHW]: <ExclamationRed />,
  [AlertCode.CWW]: <ExclamationRed />,
  [AlertCode.DBW]: <ExclamationRed />,
  [AlertCode.DEW]: <ExclamationRed />,
  [AlertCode.FRM]: <ExclamationRed />,
  [AlertCode.IBW]: <ExclamationRed />,
  [AlertCode.IFW]: <ExclamationRed />,
  [AlertCode.LSW]: <ExclamationRed />,
  [AlertCode.SIL]: <ExclamationRed />,
  [AlertCode.WFW]: <ExclamationRed />,
  [AlertCode.FCW]: <ExclamationRed />,
  [AlertCode.POS]: <ExclamationOrange />,
  [AlertCode.BNA]: <ExclamationOrange />,
  [AlertCode.DBA]: <ExclamationOrange />,
  [AlertCode.EVA]: <ExclamationOrange />,
  [AlertCode.WFA]: <ExclamationOrange />,
  [AlertCode.HBT]: <ExclamationBlue />,
};

function AlertIcon({ eventCode, isCanceled, color }: IAlertIconProps) {
  return (
    <S.IconWrapper isCanceled={isCanceled} color={color}>
      {ALERT_CODE_ICON_MAP[eventCode]}
    </S.IconWrapper>
  );
}

export default AlertIcon;
