import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundPage from './not_found';

describe('Component: NotFoundPage', () => {

  it('should render correctly(snapshot)', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <HistoryRouter history={history}>
        <NotFoundPage/>
      </HistoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render all data', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <NotFoundPage/>
      </HistoryRouter>
    );
    const logoImage = screen.getByTestId('logo-image');
    const pageText = screen.getByText(/404 Not Found. Go to/);
    const linkText = screen.getByText(/main page/);

    expect(logoImage).toBeInTheDocument();
    expect(pageText).toBeInTheDocument();
    expect(linkText).toBeInTheDocument();
  });
});
