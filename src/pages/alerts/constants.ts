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

import { AlertCode } from 'pages/alerts/types';
import { AlertState } from 'types/Alert';

enum AlertColors {
  RED_COLOR = '#FA0000',
  ORANGE_COLOR = '#F97301',
  BLUE_COLOR = '#41BCD9',
  GREEN_COLOR = '#2D834F',
}

enum AlertPriorityColors {
  '#707070' = 0,
  '#007efe' = 1,
  '#f1ea00' = 2,
  '#ff9900' = 3,
  '#fd3434' = 4,
  '#000000' = 10, // Reserved for rapid prototype
}

const ALERT_CODE_COLOR_MAP: Record<AlertCode, string> = {
  [AlertCode.ADR]: AlertColors.BLUE_COLOR,
  [AlertCode.NIC]: AlertColors.BLUE_COLOR,
  [AlertCode.NMN]: AlertColors.BLUE_COLOR,
  [AlertCode.AVA]: AlertColors.ORANGE_COLOR,
  [AlertCode.AVW]: AlertColors.RED_COLOR,
  [AlertCode.BLU]: AlertColors.RED_COLOR,
  [AlertCode.BZW]: AlertColors.RED_COLOR,
  [AlertCode.CAE]: AlertColors.RED_COLOR,
  [AlertCode.CFA]: AlertColors.ORANGE_COLOR,
  [AlertCode.FFA]: AlertColors.ORANGE_COLOR,
  [AlertCode.FLA]: AlertColors.ORANGE_COLOR,
  [AlertCode.CFW]: AlertColors.RED_COLOR,
  [AlertCode.FFW]: AlertColors.RED_COLOR,
  [AlertCode.FLW]: AlertColors.RED_COLOR,
  [AlertCode.DMO]: AlertColors.BLUE_COLOR,
  [AlertCode.NPT]: AlertColors.BLUE_COLOR,
  [AlertCode.RMT]: AlertColors.BLUE_COLOR,
  [AlertCode.RWT]: AlertColors.BLUE_COLOR,
  [AlertCode.DSW]: AlertColors.RED_COLOR,
  [AlertCode.EAN]: AlertColors.RED_COLOR,
  [AlertCode.CDW]: AlertColors.RED_COLOR,
  [AlertCode.CEM]: AlertColors.RED_COLOR,
  [AlertCode.LAE]: AlertColors.RED_COLOR,
  [AlertCode.EQW]: AlertColors.RED_COLOR,
  [AlertCode.EVI]: AlertColors.RED_COLOR,
  [AlertCode.EWW]: AlertColors.RED_COLOR,
  [AlertCode.FFS]: AlertColors.BLUE_COLOR,
  [AlertCode.FLS]: AlertColors.BLUE_COLOR,
  [AlertCode.FRW]: AlertColors.RED_COLOR,
  [AlertCode.HLS]: AlertColors.BLUE_COLOR,
  [AlertCode.HMW]: AlertColors.RED_COLOR,
  [AlertCode.HUA]: AlertColors.ORANGE_COLOR,
  [AlertCode.HUW]: AlertColors.RED_COLOR,
  [AlertCode.HWA]: AlertColors.ORANGE_COLOR,
  [AlertCode.HWW]: AlertColors.RED_COLOR,
  [AlertCode.LEW]: AlertColors.RED_COLOR,
  [AlertCode.NUW]: AlertColors.RED_COLOR,
  [AlertCode.RHW]: AlertColors.RED_COLOR,
  [AlertCode.SMW]: AlertColors.RED_COLOR,
  [AlertCode.SPS]: AlertColors.BLUE_COLOR,
  [AlertCode.SPW]: AlertColors.RED_COLOR,
  [AlertCode.SSA]: AlertColors.ORANGE_COLOR,
  [AlertCode.SSW]: AlertColors.RED_COLOR,
  [AlertCode.SVA]: AlertColors.ORANGE_COLOR,
  [AlertCode.SVR]: AlertColors.RED_COLOR,
  [AlertCode.SVS]: AlertColors.BLUE_COLOR,
  [AlertCode.TOA]: AlertColors.ORANGE_COLOR,
  [AlertCode.TOE]: AlertColors.RED_COLOR,
  [AlertCode.TOR]: AlertColors.RED_COLOR,
  [AlertCode.TRA]: AlertColors.ORANGE_COLOR,
  [AlertCode.TRW]: AlertColors.RED_COLOR,
  [AlertCode.TSA]: AlertColors.ORANGE_COLOR,
  [AlertCode.TSW]: AlertColors.RED_COLOR,
  [AlertCode.VOW]: AlertColors.RED_COLOR,
  [AlertCode.WSA]: AlertColors.ORANGE_COLOR,
  [AlertCode.WSW]: AlertColors.RED_COLOR,
  [AlertCode.BHW]: AlertColors.RED_COLOR,
  [AlertCode.BNF]: AlertColors.RED_COLOR,
  [AlertCode.BWW]: AlertColors.RED_COLOR,
  [AlertCode.CHW]: AlertColors.RED_COLOR,
  [AlertCode.CWW]: AlertColors.RED_COLOR,
  [AlertCode.DBW]: AlertColors.RED_COLOR,
  [AlertCode.DEW]: AlertColors.RED_COLOR,
  [AlertCode.FRM]: AlertColors.RED_COLOR,
  [AlertCode.IBW]: AlertColors.RED_COLOR,
  [AlertCode.IFW]: AlertColors.RED_COLOR,
  [AlertCode.LSW]: AlertColors.RED_COLOR,
  [AlertCode.SIL]: AlertColors.RED_COLOR,
  [AlertCode.WFW]: AlertColors.RED_COLOR,
  [AlertCode.FCW]: AlertColors.RED_COLOR,
  [AlertCode.POS]: AlertColors.ORANGE_COLOR,
  [AlertCode.BNA]: AlertColors.ORANGE_COLOR,
  [AlertCode.DBA]: AlertColors.ORANGE_COLOR,
  [AlertCode.EVA]: AlertColors.ORANGE_COLOR,
  [AlertCode.WFA]: AlertColors.ORANGE_COLOR,
  [AlertCode.HBT]: AlertColors.BLUE_COLOR,
};

const ALERT_STATE_TEXT: Record<AlertState, string> = {
  [AlertState.ALERT]: 'alert',
  [AlertState.NEW]: 'new',
  [AlertState.UPDATE]: 'updated',
  [AlertState.CANCEL]: 'cancelled',
};

export { ALERT_CODE_COLOR_MAP, ALERT_STATE_TEXT, AlertColors, AlertPriorityColors };
