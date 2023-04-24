import { OfferType } from '../../types/offer';
import { getOfferTypeName } from '../../utils/offer';

type PropertyFeaturesType = {
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
}
function PropertyFeatures({type, bedrooms, maxAdults}: PropertyFeaturesType): JSX.Element{
  return(
    <ul className="property__features">
      <li className="property__feature property__feature--entire" data-testid='property-feature__type'>
        {getOfferTypeName(type)}
      </li>
      <li className="property__feature property__feature--bedrooms" data-testid='property-feature__bedrooms'>
        {bedrooms} Bedrooms
      </li>
      <li className="property__feature property__feature--adults" data-testid='property-feature__max-adults'>
        Max {maxAdults} adults
      </li>
    </ul>
  );
}

export default PropertyFeatures;
