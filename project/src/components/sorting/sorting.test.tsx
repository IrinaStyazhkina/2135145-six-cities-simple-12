import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sorting from './sorting';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const handleChangeSort = jest.fn();

    render(<Sorting currentSort='Popular' handleChangeSort={handleChangeSort}/>);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.queryByTestId('places__options')).not.toBeInTheDocument();
  });

  it('should fire handleChangeSort while change sort clicking', async () => {
    const handleChangeSort = jest.fn();

    render(<Sorting currentSort='Popular' handleChangeSort={handleChangeSort}/>);

    expect(screen.queryByTestId('places__options')).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('sorting__control'));

    expect(screen.getByTestId('places__options')).toBeInTheDocument();
    await userEvent.click(screen.getByText(/Price: low to high/));
    expect(handleChangeSort).toBeCalledTimes(1);
  });
});
