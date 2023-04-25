import { Icon, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const/const';
import useMap from '../../hooks/use-map';
import { City } from '../../types/city';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';

const defaultIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type MapProps = {
  city: City;
  points: Offer[];
  selectedPoint: Offer | null;
  className?: string;
}

function Map({city, points, selectedPoint, className} : MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map) {
      map.setView([city.location.latitude, city.location.longitude]);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(selectedPoint !== null && selectedPoint.id === point.id
            ? currentIcon
            : defaultIcon)
          .addTo(map);
      });
    }
  }, [map, city, points, selectedPoint]);

  return (<section data-testid='map' className={`map ${className || ''}`} ref={mapRef}></section>);
}

export default Map;
