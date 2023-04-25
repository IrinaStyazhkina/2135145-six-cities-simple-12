import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeOffer } from '../../utils/testData';
import HistoryRouter from '../history-router/history-router';
import PlacesList from './places-list';

describe('Component: PlacesList', () => {
  it('should render correctly for near type', () => {
    const onCardHover = jest.fn();
    const onCardUnhover = jest.fn();
    const offers = new Array(4).fill(null).map(makeFakeOffer);
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PlacesList
          offers={offers}
          type={'near'}
          onCardHover={onCardHover}
          onCardUnhover={onCardUnhover}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId('places__list')).toHaveClass('near-places__list');
    expect(screen.getAllByTestId('card_type-near')).toHaveLength(4);
    expect(screen.queryByTestId('card_type-cities')).not.toBeInTheDocument();
  });

  it('should render correctly for cities type', () => {
    const onCardHover = jest.fn();
    const onCardUnhover = jest.fn();
    const offers = new Array(2).fill(null).map(makeFakeOffer);
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PlacesList
          offers={offers}
          type={'cities'}
          onCardHover={onCardHover}
          onCardUnhover={onCardUnhover}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId('places__list')).not.toHaveClass('near-places__list');
    expect(screen.getAllByTestId('card_type-cities')).toHaveLength(2);
    expect(screen.queryByTestId('card_type-near')).not.toBeInTheDocument();
  });

  it('should fire onCardHover and onCardUnhover while hovering and unhovering list items', () => {
    const onCardHover = jest.fn();
    const onCardUnhover = jest.fn();
    const offers = new Array(2).fill(null).map(makeFakeOffer);
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PlacesList
          offers={offers}
          type={'cities'}
          onCardHover={onCardHover}
          onCardUnhover={onCardUnhover}
        />
      </HistoryRouter>
    );

    fireEvent.mouseEnter(screen.getAllByTestId('card_type-cities')[0]);
    expect(onCardHover).toBeCalledTimes(1);
    fireEvent.mouseLeave(screen.getAllByTestId('card_type-cities')[0]);
    expect(onCardUnhover).toBeCalledTimes(1);
  });
});
