import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getOffers } from '../../store/app-data/selectors';
import { setSorting } from '../../store/app-process/app-process';
import { getSortType } from '../../store/app-process/selectors';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { SortType } from '../../types/sort';
import { getOffersByCity } from '../../utils/offer';
import { sortOffers } from '../../utils/sort';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import Sorting from '../sorting/sorting';

type CitiesType = {
  selectedCity: City;
}
function Cities({ selectedCity} : CitiesType): JSX.Element {
  const allOffers = useAppSelector(getOffers);
  const currentSortType = useAppSelector(getSortType);
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  const dispatch = useAppDispatch();
  const onSelectSort = useCallback((sortType: SortType) => {
    dispatch(setSorting({sortType}));
  }, []);
  const onCardHover = useCallback((offer: Offer) => {
    setActiveCard(offer);
  }, []);
  const onCardUnhover = useCallback(() => {
    setActiveCard(null);
  }, []);

  const offersForCity = useMemo(() => sortOffers(currentSortType, getOffersByCity(selectedCity.name, allOffers)),
    [currentSortType, selectedCity]);
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersForCity.length} places to stay in {selectedCity.name}</b>
          <Sorting currentSort={currentSortType} handleChangeSort={onSelectSort}/>
          <PlacesList offers={offersForCity} type="cities" onCardHover={onCardHover} onCardUnhover={onCardUnhover}/>
        </section>
        <div className="cities__right-section">
          <Map city={selectedCity} points={offersForCity} className="cities__map" selectedPoint={activeCard}/>
        </div>
      </div>
    </div>
  );
}

export default Cities;
