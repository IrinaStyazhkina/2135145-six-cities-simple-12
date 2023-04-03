import Cities from '../../components/cities/cities';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { changeCity } from '../../store/action';
import { City } from '../../types/city';

type MainPageProps = {
  cardsCount: number;
}
function MainPage({cardsCount}: MainPageProps): JSX.Element {

  const selectedCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const onSelectCity = (city: City) => {
    dispatch(changeCity({city}));
  };
  return (
    <>
      <Header/>
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <LocationsList selectedCity={selectedCity} handleSelectCity={onSelectCity}/>
            </section>
          </div>
          <Cities selectedCity={selectedCity}/>
        </main>
      </div>
    </>
  );
}

export default MainPage;
