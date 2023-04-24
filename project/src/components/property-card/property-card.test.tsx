import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/testData';
import PropertyCard from './property-card';

describe('Component: PropertyCard', () => {
  it('should render correctly', () => {
    const currentOffer = makeFakeOffer();

    render(<PropertyCard currentOffer={currentOffer}/>);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
    expect(screen.getByText(currentOffer.title)).toBeInTheDocument();
    expect(screen.getByText(currentOffer.rating)).toBeInTheDocument();
    expect(screen.getByText(`${currentOffer.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${currentOffer.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(`€${currentOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(currentOffer.host.name)).toBeInTheDocument();
    expect(screen.getByText(currentOffer.description)).toBeInTheDocument();
  });
});
