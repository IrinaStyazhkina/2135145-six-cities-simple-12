import { render, screen } from '@testing-library/react';
import { makeFakeUrl } from '../../utils/testData';
import PropertyGallery from './property-gallery';

describe('Component: PropertyGallery', () => {
  const images = new Array(4).fill(null).map(makeFakeUrl);
  it('should render correctly', () => {

    render(<PropertyGallery images={images}/>);

    const renderedImages = screen.getAllByTestId('property__image');
    expect(renderedImages).toHaveLength(4);
    expect(renderedImages[0]).toHaveAttribute('src', images[0]);
    expect(renderedImages[1]).toHaveAttribute('src', images[1]);
    expect(renderedImages[2]).toHaveAttribute('src', images[2]);
    expect(renderedImages[3]).toHaveAttribute('src', images[3]);
  });
});
