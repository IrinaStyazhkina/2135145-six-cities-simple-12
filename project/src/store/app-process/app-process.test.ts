import { AppProcess } from '../../types/state';
import { appProcess, changeCity, setSorting } from './app-process';

const initialState: AppProcess = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  },
  sortType: 'Popular',
};
describe('Reducer: appProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change sorting type when new sortType is set', () => {
    expect(appProcess.reducer(initialState, setSorting({
      sortType: 'Price: high to low',
    }))).toEqual({
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13,
        }
      },
      sortType: 'Price: high to low',
    });

    expect(appProcess.reducer(initialState, setSorting({
      sortType: 'Price: low to high',
    }))).toEqual({
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13,
        }
      },
      sortType: 'Price: low to high',
    });
  });

  it('should change current city data when new city is set', () => {
    expect(appProcess.reducer(initialState, changeCity({
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13,
        }
      },
    }))).toEqual({
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13
        }
      },
      sortType: 'Popular',
    });
  });
});
