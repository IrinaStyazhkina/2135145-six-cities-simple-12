import { fireEvent, render, screen } from '@testing-library/react';
import Sorting from './sorting';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const handleChangeSort = jest.fn();

    render(<Sorting currentSort='Popular' handleChangeSort={handleChangeSort}/>);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.queryByTestId('places__options')).not.toBeInTheDocument();
  });

  it('should fire handleChangeSort while change sort clicking', () => {
    const handleChangeSort = jest.fn();

    render(<Sorting currentSort='Popular' handleChangeSort={handleChangeSort}/>);

    expect(screen.queryByTestId('places__options')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('sorting__control'));
    expect(screen.getByTestId('places__options')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Price: low to high/));
    expect(handleChangeSort).toBeCalledTimes(1);
  });
});
