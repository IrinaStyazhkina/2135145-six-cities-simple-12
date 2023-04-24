import { render, screen } from '@testing-library/react';
import { User } from '../../types/user';
import { getRandomDescription, getRandomUser } from '../../utils/testData';
import Host from './host';

describe('Component: Host', () => {
  const user: User = getRandomUser();
  const descriptionText = getRandomDescription();

  it('should render correctly', () => {

    render(<Host host={user} description={descriptionText}/>);
    const avatar = screen.getByAltText('Host avatar');
    const description = screen.getByTestId('host-description');

    expect(avatar).toHaveAttribute('src', user.avatarUrl);
    expect(description).toHaveTextContent(descriptionText);
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });
});
