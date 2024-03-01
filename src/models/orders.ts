import { Cart } from './Cart';
import { User } from './user';

export interface orders {
  id: string;
  orderById: string;
  orderBy: User;
  totalPrice: number;
  totalQty: number;
  cart: Cart;
  method: string;
  cardNumber?: number;
  cvv?: number;
  nameOfCard?: string;
  expiry?: string;
  status: string;
  orderAt: Date;
  address: {
    road: string;
    number: number;
  };
}
