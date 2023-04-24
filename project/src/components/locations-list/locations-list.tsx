import cn from 'classnames';
import { Link } from 'react-router-dom';
import { CitiesList, City } from '../../types/city';

function renderCity(city: City, isSelected: boolean, onClick: (city: City) => void) {
  return (
    <li className="locations__item" key={city.name} onClick={() => onClick(city)} data-testid={'locations__item'}>
      <Link className= {cn(
        'locations__item-link tabs__item',
        {'tabs__item--active' : isSelected}
      )} to={'/'}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

type LocationsListProps = {
  selectedCity: City;
  handleSelectCity: (city: City) => void;
}
function LocationsList({selectedCity, handleSelectCity} : LocationsListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CitiesList.map((city) => renderCity(city, city.name === selectedCity.name, handleSelectCity))}
    </ul>
  );
}

export default LocationsList;
