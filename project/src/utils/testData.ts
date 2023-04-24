import {datatype, lorem, name, system, internet} from 'faker';
import { Offer } from '../types/offer';
import { NewReview, Review } from '../types/review';
import { UserData } from '../types/user-data';

const getRandomNumber = () => datatype.number({
  'min': 10,
  'max': 50,
});

const getRandomRating = () => datatype.number({
  'min': 1,
  'max': 5,
});
export const getRandomUser = () => ({
  id: getRandomNumber(),
  name: name.firstName(),
  avatarUrl: internet.avatar(),
  isPro: true,
});

export const makeFakeUrl = () => system.filePath();

export const getRandomDescription = () => lorem.sentences(2);

export const getRandomLocation = () => ({
  latitude: 48.85661,
  longitude: 2.351499,
  zoom: 13
});

export const makeFakeNewComment = (): NewReview => ({
  hotelId: getRandomNumber(),
  rating: getRandomRating(),
  comment: lorem.words(6),
});

export const makeFakeComment = (): Review => ({
  id: getRandomNumber(),
  rating: getRandomRating(),
  comment: lorem.words(6),
  date: new Date().toString(),
  user: getRandomUser(),
});

export const makeFakeOffer = (): Offer => ({
  id: getRandomNumber(),
  bedrooms: getRandomNumber(),
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  description: lorem.words(10),
  goods: new Array(3).fill(null).map(() => lorem.words(1)),
  host: getRandomUser(),
  images: new Array(3).fill(null).map(makeFakeUrl),
  isPremium: false,
  location: getRandomLocation(),
  maxAdults: getRandomNumber(),
  previewImage: system.filePath(),
  price: getRandomNumber(),
  rating: getRandomRating(),
  title: lorem.words(3),
  type: 'room',
});

export const makeFakeUserData = (): UserData => ({
  id: getRandomNumber(),
  email: internet.email(),
  token: lorem.words(1),
});
