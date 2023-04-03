import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { changeCity } from '../../store/action';
import { City } from '../../types/city';
import { getOffersByCity } from '../../utils/city';

type MainPageProps = {
  cardsCount: number;
}
function MainPage({cardsCount}: MainPageProps): JSX.Element {

  const selectedCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  const onUserSelectCity = (city: City) => {
    dispatch(changeCity({city}));
  };
  const offersForCity = getOffersByCity(selectedCity.name, allOffers);

  return (
    <>
      <Header/>
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <LocationsList selectedCity={selectedCity} handleSelectCity={onUserSelectCity}/>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersForCity.length} places to stay in {selectedCity.name}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  &nbsp;
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <PlacesList offers={offersForCity} type="cities"/>
              </section>
              <div className="cities__right-section">
                <Map city={selectedCity} points={offersForCity.map((offer) => offer.location)} className="cities__map"/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default MainPage;
