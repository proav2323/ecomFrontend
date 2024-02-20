import { Product } from './products';
import { User } from './user';

export interface Reviews {
  id: string;
  userId: string;
  user: User;
  comment: string;
  stars: number;
  productId: string;
  product: Product;
}
