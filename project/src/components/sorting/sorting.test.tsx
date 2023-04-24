import { render, screen } from '@testing-library/react';
import Sorting from './sorting';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const handleChangeSort = jest.fn();

    render(<Sorting currentSort='Popular' handleChangeSort={handleChangeSort}/>);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.queryByTestId('places__options')).not.toBeInTheDocument();
  });
});
