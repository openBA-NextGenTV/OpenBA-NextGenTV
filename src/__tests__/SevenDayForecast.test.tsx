import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { SevenDayForecast } from '../section/widget/widgets';
import { ResultData } from '../section/widget/widgets/sevenDayForecast/hooks/types';
import { WeatherDay } from '../section/widget/widgets/sevenDayForecast/weatherDay';
import { Property } from '../section/widget/widgets/sevenDayForecast/weatherDay/property';

let mockData: ResultData | undefined = undefined;
let mockLoading = false;

jest.mock('../section/widget/widgets/sevenDayForecast/hooks', () => ({
  useGetSevenDayForecast: () => ({
    loading: mockLoading,
    data: mockData,
  }),
}));

test.skip('User message - Weather will update in a moment. Loading = true', () => {
  mockLoading = true;
  mockData = undefined;

  const { getByText } = render(
    <MockedProvider>
      <SevenDayForecast />
    </MockedProvider>,
  );
  expect(getByText('Weather will update in a moment.')).toBeTruthy();
});

test.skip('User message - Weather is not available. Data = undefined', () => {
  mockData = undefined;
  mockLoading = false;

  const { getByText } = render(
    <MockedProvider>
      <SevenDayForecast />
    </MockedProvider>,
  );
  expect(getByText('Weather is not available.')).toBeTruthy();
});

test.skip('Render SevenDayForecast', () => {
  mockData = {
    location: 'Las Vegas, Nevada',
    headerTemp: 87,
    headerIconCode: 97,
    headerTitle: 'Clear',
    days: [],
  };
  mockLoading = false;

  const { getByText } = render(
    <MockedProvider>
      <SevenDayForecast />
    </MockedProvider>,
  );
  expect(getByText('Las Vegas, Nevada')).toBeTruthy();
});

test.skip('Render WeatherDay', () => {
  const component = renderer.create(
    <WeatherDay
      dateTime={1626271200000}
      hiTemp={100}
      humidity={30}
      dayIconCode="65"
      nighIconCode="65"
      lowTemp={88}
      precipitation={10}
      title="Sunny"
      ultraviolet="Very High"
      wind={15}
      windDirection="SSE"
    />,
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test.skip('Render WeatherDay Property', () => {
  const component = renderer.create(<Property label="Precipitation" value="20%" />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});