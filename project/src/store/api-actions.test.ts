import { configureMockStore } from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { APIRoute } from '../const/routes';
import { createApi } from '../services/api';
import { State } from '../types/state';
import { makeFakeNewComment, makeFakeOffer, makeFakeUserData } from '../utils/testData';
import { redirectToRoute } from './action';
import {
  checkAuthAction,
  fetchOfferData,
  fetchOffersAction,
  loginAction,
  logoutAction,
  sendNewComment
} from './api-actions';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should return userdata on success GET /login', async() => {
    const mockUserData = makeFakeUserData();
    mockApi
      .onGet(APIRoute.Login)
      .reply(200, mockUserData);

    const store = mockStore();

    const userData = await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);

    expect(userData.payload).toStrictEqual(mockUserData);
  });

  it('should return userData and set token to storage on successful POST /login', async () => {
    const mockUserData = makeFakeUserData();
    mockApi
      .onPost(APIRoute.Login, {
        email: mockUserData.email,
        password: '12345',
      })
      .reply(200, mockUserData);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction({email: mockUserData.email, password: '12345'}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', mockUserData.token);

  });

  it('should dispatch sendNewComment action on successful POST /comments',async () => {
    const mockComment = makeFakeNewComment();
    mockApi
      .onPost(`${APIRoute.Comments}/1`, {
        rating: mockComment.rating,
        comment: mockComment.comment,
      })
      .reply(200, mockComment);

    const store = mockStore();
    await store.dispatch(sendNewComment({
      hotelId: 1,
      rating: mockComment.rating,
      comment: mockComment.comment,
    }));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendNewComment.pending.type,
      sendNewComment.fulfilled.type,
    ]);
  });

  it('should dispatch Fetch_Offers when GET /hotels', async () => {
    const mockOffers = new Array(3).fill(null).map(makeFakeOffer);
    mockApi
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should dispatch Fetch_Offer_Data when GET current offer', async() => {
    const currentOfferMock = makeFakeOffer();
    const offersNearByMock = new Array(3).fill(null).map(makeFakeOffer);
    const commentsMock = new Array(2).fill(null).map(makeFakeNewComment);

    mockApi
      .onGet(`${ APIRoute.Offers }/1`)
      .reply(200, currentOfferMock);

    mockApi.onGet(`${ APIRoute.Offers }/1/nearby`)
      .reply(200, offersNearByMock);

    mockApi.onGet(`${ APIRoute.Comments }/1`)
      .reply(200, commentsMock);

    const store = mockStore();
    await store.dispatch(fetchOfferData(1));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferData.pending.type,
      fetchOfferData.fulfilled.type,
    ]);
  });

  it('should dispatch logout when DELETE /logout', async () => {
    mockApi
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('six-cities-token');
  });
});
