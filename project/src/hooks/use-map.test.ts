import { renderHook } from '@testing-library/react';
import { City } from '../types/city';
import useMap from './use-map';

describe('Hook: useMap', () => {
  it('should return map instance', () => {
    const mapElement = document.createElement('div');
    const mapRef = {
      current: mapElement,
    };
    const city = {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    } as City;

    const {result} = renderHook(() =>
      useMap(mapRef, city),
    );

    const map = result.current;
    expect(map?.options).toHaveProperty('zoom', 13);
    expect(map?.options).toHaveProperty('center.lat', 48.85661);
    expect(map?.options).toHaveProperty('center.lng', 2.351499);
  });
});
