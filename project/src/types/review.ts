import { User } from './user';

export type Review = {
  id: number;
  rating: number;
  comment: string;
  date: string;
  user: User;
}

export type NewReview = {
  hotelId: number;
  rating: number;
  comment: string;
};

export type Reviews = Review[];
