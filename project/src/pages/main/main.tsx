import cn from 'classnames';
import { useMemo } from 'react';
import Cities from '../../components/cities/cities';
import EmptyState from '../../components/empty-state/empty-state';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getOffers } from '../../store/app-data/selectors';
import { changeCity } from '../../store/app-process/app-process';
import { getCity, getSortType } from '../../store/app-process/selectors';
import { City } from '../../types/city';
import { getOffersByCity } from '../../utils/offer';
import { sortOffers } from '../../utils/sort';

function MainPage(): JSX.Element {
  const allOffers = useAppSelector(getOffers);
  const currentSortType = useAppSelector(getSortType);
  const selectedCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();
  const onSelectCity = (city: City) => {
    dispatch(changeCity({city}));
  };

  const offersForCity = useMemo(() => sortOffers(currentSortType, getOffersByCity(selectedCity.name, allOffers)),
    [currentSortType, selectedCity, allOffers]);

  return (
    <>
      <Header/>
      <div className="page page--gray page--main">
        <main className={cn('page__main page__main--index', {'page__main--index-empty' : offersForCity?.length === 0})}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <LocationsList selectedCity={selectedCity} handleSelectCity={onSelectCity}/>
            </section>
          </div>
          {offersForCity?.length > 0 ? (
            <Cities selectedCity={selectedCity} offersForCity={offersForCity} currentSortType={currentSortType}/>
          ) :
            (<EmptyState city={selectedCity}/>)}
        </main>
      </div>
    </>
  );
}

export default MainPage;
