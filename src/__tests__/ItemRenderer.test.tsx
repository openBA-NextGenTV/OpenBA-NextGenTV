import { render, screen } from '@testing-library/react';
import { Item } from 'src/hooks';
import { ItemRenderer } from 'src/section/widget/widgets/priority/itemRenderer';

import { I18NProvider } from '../i18n';

describe('ItemRenderer', () => {
  const item: Item = {
    label: 'Item label',
  };

  it('should render ItemRenderer', () => {
    render(
      <I18NProvider>
        <ItemRenderer item={item} onClick={() => null} isDisable={true} />
      </I18NProvider>,
    );
    expect(screen.queryByText(item.label)).toBeTruthy();
  });
});
