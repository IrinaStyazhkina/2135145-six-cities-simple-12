import cn from 'classnames';
import { Sort } from '../../const/sort';
import { SortType } from '../../types/sort';

function renderSortValue(sortType: string, isSelected: boolean, onClick: () => void) {
  return (
    <li
      key={sortType}
      className={cn('places__option', {'places__option--active': isSelected})}
      tabIndex={0}
      onClick={onClick}
    >
      {sortType}
    </li>);
}

type SortingType = {
  currentSort: SortType;
  handleChangeSort: (sortType: SortType) => void;
}

function Sorting({currentSort, handleChangeSort}: SortingType): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        &nbsp;{currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {Object.values(Sort).map((sort) => renderSortValue(sort, sort === currentSort, () => {handleChangeSort(sort);}))}
      </ul>
    </form>
  );
}

export default Sorting;
