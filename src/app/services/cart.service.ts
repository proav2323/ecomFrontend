import { ProductsService } from './products.service';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, Items } from 'src/models/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: WritableSignal<Cart | null> = signal(
    JSON.parse(localStorage.getItem('cart') ?? 'null') === null
      ? null
      : JSON.parse(localStorage.getItem('cart') ?? '')
  );

  constructor(
    private ProductsService: ProductsService,
    private snakbar: MatSnackBar
  ) {}

  async addToCart(itemId: string, colorId: string, qty: number, price: number) {
    if (this.cart() !== null) {
      const found = this.cart()?.items.find(
        (data) => data.productId === itemId
      );

      if (found !== undefined) {
        this.snakbar.open('product is in cart', 'close');
        return;
      }

      const itemToAdd: Items = {
        productId: itemId,
        colorId: colorId,
        Qty: qty,
        price: price,
      };
      const oldCart: Cart = this.cart()!;

      oldCart.items.push(itemToAdd);

      let totalPrice = 0;
      let totalQty = 0;
      oldCart.items.forEach((data) => {
        totalPrice += data.price * data.Qty;
        totalQty += data.Qty;
      });

      const newCart: Cart = {
        items: oldCart.items,
        totalPrice: totalPrice,
        totalQty: totalQty,
      };

      this.cart.set(newCart);
      this.snakbar.open('product added', 'close');
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      const itemToAdd: Items = {
        productId: itemId,
        colorId: colorId,
        Qty: qty,
        price: price,
      };
      const oldCart: Cart = { items: [], totalPrice: 0, totalQty: 0 };

      oldCart.items.push(itemToAdd);

      let totalPrice = 0;
      let totalQty = 0;

      oldCart.items.forEach((data) => {
        totalPrice = totalPrice + data.price * data.Qty;
        totalQty = totalQty + data.Qty;
      });
      const newCart: Cart = {
        items: oldCart.items,
        totalPrice: totalPrice,
        totalQty: totalQty,
      };
      this.cart.set(newCart);
      this.snakbar.open('product added', 'close');
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log(newCart.totalPrice, newCart.totalQty);
    }
  }

  updateProduct(
    itemId: string,
    colorId: string,
    qty: number,
    state: WritableSignal<boolean>
  ) {
    if (this.cart() !== null) {
      state.set(true);
      const item = this.cart()?.items.find((data) => data.productId === itemId);

      if (item === undefined) {
        this.snakbar.open('no product found', 'close');
        state.set(false);
        return;
      }

      const oldCart = this.cart()!;
      let newItmes = this.cart()!.items;
      const newItem = item;
      const itemI = newItmes.findIndex((data) => data.productId === itemId);
      newItmes[itemI].colorId = colorId;
      newItmes[itemI].Qty = newItem.Qty + qty;

      oldCart.items = newItmes;

      let totalPrice = 0;
      let totalQty = 0;

      oldCart.items.forEach(async (data) => {
        totalPrice += data.price * data.Qty;
        totalQty += data.Qty;
      });

      const newCart: Cart = {
        items: oldCart.items,
        totalPrice: totalPrice,
        totalQty: totalQty,
      };

      this.cart.set(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      state.set(false);
    } else {
      this.snakbar.open('no itme found in cart', 'close');
      state.set(false);
    }
  }

  removeItem(itemId: string) {
    if (this.cart() !== null) {
      const item = this.cart()?.items.find((data) => data.productId === itemId);

      if (item === undefined) {
        this.snakbar.open('no product found', 'close');
        return;
      }

      const oldCart = this.cart()!;
      const neItems = this.cart()!.items.filter(
        (data) => data.productId !== itemId
      );

      oldCart.items = neItems;

      let totalPrice = 0;
      let totalQty = 0;

      oldCart.items.forEach(async (data) => {
        const item = await this.ProductsService.getByIdWithReturn(
          data.productId
        );

        if (item !== null) {
          totalPrice += item.price * data.Qty;
          totalQty += data.Qty;
        } else {
          this.snakbar.open('product not found', 'close');
        }
      });

      oldCart.totalPrice = totalPrice;
      oldCart.totalQty = totalQty;

      this.cart.set(oldCart);
      this.snakbar.open('product removed');
      localStorage.setItem('cart', JSON.stringify(oldCart));
    } else {
      this.snakbar.open('no itme found in cart', 'close');
    }
  }

  clearCart() {
    this.cart.set(null);
    localStorage.removeItem('cart');
  }
}
