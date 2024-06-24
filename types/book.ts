import { RentalHistory } from './rentalHistory';

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageLink: string;
  isLending: boolean;
  publishedDate: string;
  rental?: RentalHistory | null;
  place: string;
  donor: string;
};
