import { AppData } from '../../types/state';
import { makeFakeNewComment, makeFakeOffer } from '../../utils/testData';
import { fetchOfferData, fetchOffersAction, sendNewComment } from '../api-actions';
import { appData } from './app-data';

const initialState: AppData = {
  offers: [],
  currentOffer: null,
  offersNearBy: [],
  comments: [],
  isDataLoading: false,
  isCommentSending: false,
};

describe('Reducer: appData', () => {
  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update comments by new question sent', () => {
    const mockComment = makeFakeNewComment();
    expect(appData.reducer(initialState, {type: sendNewComment.fulfilled.type, payload: mockComment }))
      .toEqual({
        offers: [],
        currentOffer: null,
        offersNearBy: [],
        comments: mockComment,
        isDataLoading: false,
        isCommentSending: false,
      });
  });

  it('should set dataLoading state when offers fetching is not finished', () => {
    expect(appData.reducer(initialState, {type: fetchOffersAction.pending.type}))
      .toEqual({
        offers: [],
        currentOffer: null,
        offersNearBy: [],
        comments: [],
        isDataLoading: true,
        isCommentSending: false,
      });
  });

  it('should update offers when offers loading is finished', () => {
    const mockOffers = new Array(2).fill(null).map(makeFakeOffer);
    expect(appData.reducer(initialState, {type: fetchOffersAction.fulfilled.type, payload: mockOffers}))
      .toEqual({
        offers: mockOffers,
        currentOffer: null,
        offersNearBy: [],
        comments: [],
        isDataLoading: false,
        isCommentSending: false,
      });
  });

  it('should update current offer data, offers near by and comments when current offer loading is finished', () => {
    const currentOffer = makeFakeOffer();
    const offersNearBy = new Array(3).fill(null).map(makeFakeOffer);
    const comments = new Array(2).fill(null).map(makeFakeNewComment);
    expect(appData.reducer(initialState, {type: fetchOfferData.fulfilled.type, payload: {
      currentOffer, offersNearBy, comments }}))
      .toEqual({
        offers: [],
        currentOffer: currentOffer,
        offersNearBy: offersNearBy,
        comments: comments,
        isDataLoading: false,
        isCommentSending: false,
      });
  });
});
