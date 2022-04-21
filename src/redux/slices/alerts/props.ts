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

type Item = {
  bgAlertColor: string;
  iconName: string;
};

const items: [key: string, value: Item][] = [
  ['EAN', { iconName: 'EAN', bgAlertColor: '#FA0000' }],
  ['TOR', { iconName: 'TOR', bgAlertColor: '#FA0000' }],
  ['TSW', { iconName: 'TSW', bgAlertColor: '#FA0000' }],
  ['AVW', { iconName: 'AVW', bgAlertColor: '#FA0000' }],
  ['BLU', { iconName: 'BLU', bgAlertColor: '#FA0000' }],
  ['BZW', { iconName: 'BZW', bgAlertColor: '#FA0000' }],
  ['CAE', { iconName: 'CAE', bgAlertColor: '#FA0000' }],
  ['CDW', { iconName: 'EAN', bgAlertColor: '#FA0000' }],
  ['CEM', { iconName: 'EAN', bgAlertColor: '#FA0000' }],
  ['CFW', { iconName: 'CFW', bgAlertColor: '#FA0000' }],
  ['DSW', { iconName: 'DSW', bgAlertColor: '#FA0000' }],
  ['EQW', { iconName: 'EQW', bgAlertColor: '#FA0000' }],
  ['EVI', { iconName: 'EVI', bgAlertColor: '#FA0000' }],
  ['EWW', { iconName: 'EWW', bgAlertColor: '#FA0000' }],
  ['FFW', { iconName: 'CFW', bgAlertColor: '#FA0000' }],
  ['FLW', { iconName: 'CFW', bgAlertColor: '#FA0000' }],
  ['FRW', { iconName: 'FRW', bgAlertColor: '#FA0000' }],
  ['HMW', { iconName: 'HMW', bgAlertColor: '#FA0000' }],
  ['HUW', { iconName: 'HUW', bgAlertColor: '#FA0000' }],
  ['HWW', { iconName: 'HWW', bgAlertColor: '#FA0000' }],
  ['LAE', { iconName: 'EAN', bgAlertColor: '#FA0000' }],
  ['LEW', { iconName: 'LEW', bgAlertColor: '#FA0000' }],
  ['NUW', { iconName: 'NUW', bgAlertColor: '#FA0000' }],
  ['RHW', { iconName: 'RHW', bgAlertColor: '#FA0000' }],
  ['SMW', { iconName: 'SMW', bgAlertColor: '#FA0000' }],
  ['SPW', { iconName: 'SPW', bgAlertColor: '#FA0000' }],
  ['SSW', { iconName: 'SSW', bgAlertColor: '#FA0000' }],
  ['SVR', { iconName: 'SVR', bgAlertColor: '#FA0000' }],
  ['TOE', { iconName: 'TOE', bgAlertColor: '#FA0000' }],
  ['TRW', { iconName: 'TRW', bgAlertColor: '#FA0000' }],
  ['VOW', { iconName: 'VOW', bgAlertColor: '#FA0000' }],
  ['WSW', { iconName: 'WSW', bgAlertColor: '#FA0000' }],
  ['AVA', { iconName: 'AVA', bgAlertColor: '#F97301' }],
  ['CFA', { iconName: 'CFA', bgAlertColor: '#F97301' }],
  ['FFA', { iconName: 'CFA', bgAlertColor: '#F97301' }],
  ['FLA', { iconName: 'CFA', bgAlertColor: '#F97301' }],
  ['HUA', { iconName: 'HUA', bgAlertColor: '#F97301' }],
  ['HWA', { iconName: 'HWA', bgAlertColor: '#F97301' }],
  ['SSA', { iconName: 'SSA', bgAlertColor: '#F97301' }],
  ['SVA', { iconName: 'SVA', bgAlertColor: '#F97301' }],
  ['TOA', { iconName: 'TOA', bgAlertColor: '#F97301' }],
  ['TRA', { iconName: 'TRA', bgAlertColor: '#F97301' }],
  ['TSA', { iconName: 'TSA', bgAlertColor: '#F97301' }],
  ['WSA', { iconName: 'WSA', bgAlertColor: '#F97301' }],
  ['ADR', { iconName: 'ADR', bgAlertColor: '#41BCD9' }],
  ['DMO', { iconName: 'DMO', bgAlertColor: '#41BCD9' }],
  ['FFS', { iconName: 'FFS', bgAlertColor: '#41BCD9' }],
  ['FLS', { iconName: 'FFS', bgAlertColor: '#41BCD9' }],
  ['HLS', { iconName: 'HLS', bgAlertColor: '#41BCD9' }],
  ['NIC', { iconName: 'ADR', bgAlertColor: '#41BCD9' }],
  ['NMN', { iconName: 'ADR', bgAlertColor: '#41BCD9' }],
  ['NPT', { iconName: 'DMO', bgAlertColor: '#41BCD9' }],
  ['RMT', { iconName: 'DMO', bgAlertColor: '#41BCD9' }],
  ['RWT', { iconName: 'DMO', bgAlertColor: '#41BCD9' }],
  ['SPS', { iconName: 'SPS', bgAlertColor: '#41BCD9' }],
  ['SVS', { iconName: 'SVS', bgAlertColor: '#41BCD9' }],
  ['BHW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['BNF', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['BWW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['CHW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['CWW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['DBW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['DEW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['FRM', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['IBW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['IFW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['LSW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['SIL', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['WFW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['FCW', { iconName: 'ExclamationRed', bgAlertColor: '#FA0000' }],
  ['POS', { iconName: 'ExclamationOrange', bgAlertColor: '#F97301' }],
  ['BNA', { iconName: 'ExclamationOrange', bgAlertColor: '#F97301' }],
  ['DBA', { iconName: 'ExclamationOrange', bgAlertColor: '#F97301' }],
  ['EVA', { iconName: 'ExclamationOrange', bgAlertColor: '#F97301' }],
  ['WFA', { iconName: 'ExclamationOrange', bgAlertColor: '#F97301' }],
  ['HBT', { iconName: 'ExclamationBlue', bgAlertColor: '#41BCD9' }],
];

const map = new Map<string, Item>(items);

const defaultObj: Item = {
  iconName: 'ExclamationOrange',
  bgAlertColor: '#F97301',
};

const getAlertBgColor = (eventCode: string) =>
  map.get(eventCode)?.bgAlertColor || defaultObj.bgAlertColor;

const getAlertIconName = (eventCode: string) => map.get(eventCode)?.iconName || defaultObj.iconName;

export { getAlertBgColor, getAlertIconName };
