import { Namespace } from '../../const/namespace';
import { City } from '../../types/city';
import { SortType } from '../../types/sort';
import { State } from '../../types/state';

export const getCity = (state: State): City => state[Namespace.App].city;
export const getSortType = (state: State): SortType => state[Namespace.App].sortType;
