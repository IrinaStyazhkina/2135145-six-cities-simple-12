import cn from 'classnames';
import React, { useState } from 'react';
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
  const [isSelectorCollapsed, setIsSelectorCollapsed] = useState<boolean>(false);

  const onChangeSort = (sort: SortType) => {
    handleChangeSort(sort);
    setIsSelectorCollapsed(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => {setIsSelectorCollapsed(!isSelectorCollapsed);}}>
        &nbsp;{currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {
        isSelectorCollapsed && (
          <ul className="places__options places__options--custom places__options--opened">
            {Object.values(Sort).map((sort) => renderSortValue(sort, sort === currentSort, () => {onChangeSort(sort);}))}
          </ul>
        )
      }
    </form>
  );
}

export default React.memo(Sorting);
