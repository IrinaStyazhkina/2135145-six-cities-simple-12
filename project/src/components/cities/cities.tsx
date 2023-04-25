import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSorting } from '../../store/app-process/app-process';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { SortType } from '../../types/sort';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import Sorting from '../sorting/sorting';

type CitiesType = {
  selectedCity: City;
  offersForCity: Offer[];
  currentSortType: SortType;
}
function Cities({ selectedCity, offersForCity, currentSortType} : CitiesType): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  const dispatch = useAppDispatch();
  const onSelectSort = useCallback((sortType: SortType) => {
    dispatch(setSorting({sortType}));
  }, [dispatch]);
  const onCardHover = useCallback((offer: Offer) => {
    setActiveCard(offer);
  }, []);
  const onCardUnhover = useCallback(() => {
    setActiveCard(null);
  }, []);


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
