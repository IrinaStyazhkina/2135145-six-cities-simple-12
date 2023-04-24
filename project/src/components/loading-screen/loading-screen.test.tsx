import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly(snapshot)', () => {
    const history = createMemoryHistory();
    const {container} = render(
      <HistoryRouter history={history}>
        <LoadingScreen/>
      </HistoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render all data', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <LoadingScreen/>
      </HistoryRouter>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
