import { Component, effect, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: Cart | null = null;
  @Input() flex: boolean = true;

  constructor(private cartService: CartService) {
    effect(() => {
      this.cart = this.cartService.cart();
    });
  }

  clear() {
    this.cartService.clearCart();
  }
}
