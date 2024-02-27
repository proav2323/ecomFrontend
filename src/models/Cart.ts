export interface Cart {
  items: Items[];
  totalPrice: number;
  totalQty: number;
}

export interface Items {
  Qty: number;
  productId: string;
  colorId: string;
  price: number;
}
