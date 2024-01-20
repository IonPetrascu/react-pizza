export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  count: number;
  types: number[];
};
export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}
export type SearchPizzaParams = {
  pageCount: string;
  categoryId: string;
  orders: string;
  search: string;
  sortProperty: string;
};
export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
