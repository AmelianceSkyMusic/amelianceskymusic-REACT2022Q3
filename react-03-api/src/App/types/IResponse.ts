import { ICard } from './ICard';

export interface IResponse {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: ICard[];
}
