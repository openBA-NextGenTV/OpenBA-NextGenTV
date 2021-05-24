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
    'Emergency Only',
    'High',
    'Medium (recommended)',
    'Low',
    'Diagnostic Alerts (not recommended)',
    'No Alerts',
  ];

  spans.forEach((span, index) => expect(span.children[0]).toBe(items[index]));
});
