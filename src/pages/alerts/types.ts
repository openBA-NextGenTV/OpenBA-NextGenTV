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

enum AlertCode {
  EAN = 'EAN',
  TOR = 'TOR',
  TSW = 'TSW',
  AVW = 'AVW',
  BLU = 'BLU',
  BZW = 'BZW',
  CAE = 'CAE',
  CDW = 'CDW',
  CEM = 'CEM',
  CFW = 'CFW',
  DSW = 'DSW',
  EQW = 'EQW',
  EVI = 'EVI',
  EWW = 'EWW',
  FFW = 'FFW',
  FLW = 'FLW',
  FRW = 'FRW',
  HMW = 'HMW',
  HUW = 'HUW',
  HWW = 'HWW',
  LAE = 'LAE',
  LEW = 'LEW',
  NUW = 'NUW',
  RHW = 'RHW',
  SMW = 'SMW',
  SPW = 'SPW',
  SSW = 'SSW',
  SVR = 'SVR',
  TOE = 'TOE',
  TRW = 'TRW',
  VOW = 'VOW',
  WSW = 'WSW',
  AVA = 'AVA',
  CFA = 'CFA',
  FFA = 'FFA',
  FLA = 'FLA',
  HUA = 'HUA',
  HWA = 'HWA',
  SSA = 'SSA',
  SVA = 'SVA',
  TOA = 'TOA',
  TRA = 'TRA',
  TSA = 'TSA',
  WSA = 'WSA',
  ADR = 'ADR',
  DMO = 'DMO',
  FFS = 'FFS',
  FLS = 'FLS',
  HLS = 'HLS',
  NIC = 'NIC',
  NMN = 'NMN',
  NPT = 'NPT',
  RMT = 'RMT',
  RWT = 'RWT',
  SPS = 'SPS',
  SVS = 'SVS',
  BHW = 'BHW',
  BNF = 'BNF',
  BWW = 'BWW',
  CHW = 'CHW',
  CWW = 'CWW',
  DBW = 'DBW',
  DEW = 'DEW',
  FRM = 'FRM',
  IBW = 'IBW',
  IFW = 'IFW',
  LSW = 'LSW',
  SIL = 'SIL',
  WFW = 'WFW',
  FCW = 'FCW',
  POS = 'POS',
  BNA = 'BNA',
  DBA = 'DBA',
  EVA = 'EVA',
  WFA = 'WFA',
  HBT = 'HBT',
}

enum AlertPriority {
  DIAGNOSTIC = -1,
  NO_ALERTS = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  EMERGENCY = 4,
  PROTOTYPE = 10, // Reserved for rapid prototype
}

export { AlertCode, AlertPriority };
