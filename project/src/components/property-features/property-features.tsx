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
      <li className="property__feature property__feature--entire">
        {getOfferTypeName(type)}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {bedrooms} Bedrooms
      </li>
      <li className="property__feature property__feature--adults">
        Max {maxAdults} adults
      </li>
    </ul>
  );
}

export default PropertyFeatures;
