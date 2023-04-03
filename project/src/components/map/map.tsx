import { Icon, LatLng, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { URL_MARKER_DEFAULT } from '../../const/const';
import useMap from '../../hooks/use-map';
import { City } from '../../types/city';
import { Location } from '../../types/location';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Location[];
  className?: string;
}

const defaultIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});
function Map({city, points, className} : MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map) {
      map.flyTo(new LatLng(city.location.latitude, city.location.longitude), city.location.zoom);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(defaultIcon)
          .addTo(map);
      });
    }
  }, [map, city, points]);

  return (<section className={`map ${className || ''}`} ref={mapRef}></section>);
}

export default Map;
