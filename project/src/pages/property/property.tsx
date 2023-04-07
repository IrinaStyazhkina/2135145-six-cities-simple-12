import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Host from '../../components/host/host';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import PropertyFeatures from '../../components/property-features/property-features';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import PropertyGoods from '../../components/property-goods/property-goods';
import Rating from '../../components/rating/rating';
import ReviewList from '../../components/review-list/review-list';
import SendCommentForm from '../../components/send-comment-form/send-comment-form';
import { AuthStatus } from '../../const/auth-status';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { setDataLoading } from '../../store/action';
import { fetchOfferData, } from '../../store/api-actions';
import { Offer } from '../../types/offer';

function PropertyPage() : JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const offersNearBy = useAppSelector((state) => state.offersNearBy);
  const comments = useAppSelector((state) => state.comments);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if(!id){
      return;
    }
    const offerId = Number(id);
    dispatch(setDataLoading(true));
    dispatch(fetchOfferData(offerId));
    dispatch(setDataLoading(false));
  }, [dispatch, id]);
  const onCardHover = (offer: Offer) => {
    setActiveCard(offer);
  };

  const onCardUnhover = () => {
    setActiveCard(null);
  };

  return(
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        {currentOffer && (
          <section className="property">
            <PropertyGallery images={currentOffer.images}/>
            <div className="property__container container">
              <div className="property__wrapper">
                {currentOffer.isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {currentOffer.title}
                  </h1>
                </div>
                <div className="property__rating rating">
                  <Rating rating={currentOffer.rating}/>
                  <span className="property__rating-value rating__value">{currentOffer.rating}</span>
                </div>
                <PropertyFeatures type={currentOffer.type} bedrooms={currentOffer.bedrooms} maxAdults={currentOffer.maxAdults}/>
                <div className="property__price">
                  <b className="property__price-value">&euro;{currentOffer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <PropertyGoods goods={currentOffer.goods}/>
                <Host host={currentOffer.host} description={currentOffer.description}/>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                  <ReviewList reviews={comments}/>
                  {authorizationStatus === AuthStatus.Auth && (
                    <SendCommentForm/>
                  )}
                </section>
              </div>
            </div>
            <Map city={currentOffer.city} points={offersNearBy} className="property__map" selectedPoint={activeCard}/>
          </section>
        )}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList offers={offersNearBy} type="near" onCardHover={onCardHover} onCardUnhover={onCardUnhover}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyPage;
