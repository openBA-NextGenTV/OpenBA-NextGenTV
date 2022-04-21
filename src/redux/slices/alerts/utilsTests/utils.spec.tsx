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

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  actualizeAlertDemo,
  getTinyUrlFromAEATMedia,
  getUniqueAlerts,
  getUniqueAlertsDemo,
  parseAEAT,
  prepareAEATMedia,
  splitAlertOriginsAndUpdatesDemo,
} from '../utils';
import { mockNoAEATable, mockNormalTable, mockOneAEATable } from './mocks';

const normalTableParsed = parseAEAT(mockNormalTable);
const oneAEATableParsed = parseAEAT(mockOneAEATable);
const noAEATableParsed = parseAEAT(mockNoAEATable);

describe('AEAT xml table parse tests', () => {
  test('AEAT with 5 alerts is array', () => {
    expect(Array.isArray(normalTableParsed.AEAT.AEA)).toBe(true);
  });

  test('AEAT length with 5 alerts', () => {
    expect(normalTableParsed.AEAT.AEA.length).toBe(5);
  });

  test('AEAT with 1 alert isnt array', () => {
    expect(Array.isArray(oneAEATableParsed.AEAT.AEA)).toBe(false);
  });

  test('AEAT without alerts', () => {
    expect(noAEATableParsed.AEAT.AEA).toBe(undefined);
  });

  test('test check location length', () => {
    expect(oneAEATableParsed.AEAT.AEA.Header.Location.length).toBe(11);
  });
});

const normalTableAlerts = normalTableParsed.AEAT.AEA;
const [originAlertsList, updateAlertsList] = splitAlertOriginsAndUpdatesDemo(normalTableAlerts);

describe('split origin alerts from updates', () => {
  test('find only 1 origin alert in list', () => {
    expect(originAlertsList.length).toBe(1);
  });

  test('find 4 update/cancel alerts in list', () => {
    expect(updateAlertsList.length).toBe(4);
  });
});

describe('find updates for alerts', () => {
  test('find updates for origin alert', () => {
    expect(originAlertsList.map((a: any) => actualizeAlertDemo(a, updateAlertsList)).length).toBe(
      1
    );
  });

  test('find updates for update alerts', () => {
    expect(
      updateAlertsList.map((a: any) => actualizeAlertDemo(a, [...updateAlertsList])).length
    ).toBe(2);
  });
});

describe('find updates for alets', () => {
  test('find only 1 origin alert in list', () => {
    expect(splitAlertOriginsAndUpdatesDemo(normalTableAlerts)[0].length).toBe(1);
  });

  test('find 4 update/cancel alerts in list', () => {
    expect(splitAlertOriginsAndUpdatesDemo(normalTableAlerts)[1].length).toBe(4);
  });
});

describe('find unique AEAT alerts old flow', () => {
  test('find only 2 unique alerts in list', () => {
    expect(getUniqueAlerts(normalTableAlerts).length).toBe(2);
  });
});

describe('find unique AEAT alerts new flow', () => {
  test('find only 3 unique alerts in list', () => {
    expect(getUniqueAlertsDemo(normalTableAlerts).length).toBe(3);
  });
});

const aeaMediaParsed = prepareAEATMedia(normalTableAlerts[3].Media);

describe('test aea media parser', () => {
  test('media always return as array', () => {
    expect(Array.isArray(prepareAEATMedia(undefined))).toBe(true);
  });

  test('media has proper length', () => {
    expect(aeaMediaParsed.length).toBe(2);
  });

  test('media has proper keys and values', () => {
    expect(aeaMediaParsed[0].mediaDesc).toBe('some media desc1');
  });
});

describe('test find tiny url', () => {
  test('tiny url missing in media', () => {
    expect(getTinyUrlFromAEATMedia(aeaMediaParsed)).toBe('');
  });

  test('tiny url in empty list', () => {
    expect(getTinyUrlFromAEATMedia([])).toBe('');
  });

  test('tiny url is in media', () => {
    expect(getTinyUrlFromAEATMedia(prepareAEATMedia(normalTableAlerts[4].Media))).toBe(
      'https://9gag.com/'
    );
  });
});
