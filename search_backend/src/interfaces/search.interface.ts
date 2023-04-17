import { filters } from './filters.interface';
import { product } from './product.interface';

export interface search {
  filters: filters;
  products: product[];
}
