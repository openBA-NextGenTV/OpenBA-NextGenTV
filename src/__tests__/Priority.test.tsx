import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import { GetPriorityDocument } from '../apollo/generated/graphql';
import { I18NProvider } from '../i18n';
import { Priority } from '../section/widget/widgets';

test('verify all items are present', () => {
  const mockData = {
    request: {
      query: GetPriorityDocument,
    },
    result: {
      data: {
        priority: 2,
      },
    },
  };

  const component = TestRenderer.create(
    <MockedProvider mocks={[mockData]} addTypename={false}>
      <ThemeProvider theme={{ menu: { backgroundColor: '0xFFFFFF', borderColor: '0xFFFFFF' } }}>
        <I18NProvider>
          <Priority />
        </I18NProvider>
      </ThemeProvider>
    </MockedProvider>,
  );

  const spans = component.root.findAllByType('span');

  const items = [
    'Alerts Off',
    'Alerts for Extreme Danger Only',
    'Alerts for Critical and Extreme Danger (includes weather warnings)',
    'Alerts for Important, Critical and Extreme Danger (includes weather watches)',
    'All Alerts',
    'All Messages and Alerts (Diagnostic Mode, includes tests)',
  ];

  spans.forEach((span, index) => expect(span.children[0]).toBe(items[index]));
});
