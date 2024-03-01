import { AuthService } from 'src/app/services/auth.service';
import { Cart } from 'src/models/Cart';
import { OrdersService } from './../../services/orders.service';
import { CartService } from 'src/app/services/cart.service';
import { Component, effect, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cart: Cart | null = null;
  error: WritableSignal<{
    cardNumber: string;
    cvv: string;
    nameOfCard: string;
    expiry: string;
    road: string;
    number: string;
  }> = signal({
    cardNumber: '',
    cvv: '',
    expiry: '',
    nameOfCard: '',
    number: '',
    road: '',
  });
  loading: WritableSignal<boolean> = signal(false);
  user: User | null = null;
  constructor(
    private CartService: CartService,
    private OrdersService: OrdersService,
    private AuthService: AuthService,
    private snackBar: MatSnackBar,
    private Router: Router
  ) {
    effect(() => {
      this.cart = this.CartService.cart();
      this.user = this.AuthService.user();
    });
  }

  data: FormGroup = new FormGroup({
    cardNumber: new FormControl(0, [Validators.required]),
    cvv: new FormControl(0, [Validators.required]),
    nameOfCard: new FormControl('', [Validators.required]),
    expiry: new FormControl('', [Validators.required]),
    road: new FormControl('', [Validators.required]),
    number: new FormControl(0, [Validators.required]),
  });

  pay() {
    this.error.set({
      cardNumber: '',
      cvv: '',
      expiry: '',
      nameOfCard: '',
      number: '',
      road: '',
    });
    const cardNumber = this.data.controls['cardNumber'].value;
    const cvv = this.data.controls['cvv'].value;
    const nameOfCard = this.data.controls['nameOfCard'].value;
    const expiry = this.data.controls['expiry'].value;
    const road = this.data.controls['road'].value;
    const number = this.data.controls['number'].value;
    if (this.data.valid) {
      if (this.cart === null || this.user === null) {
        return;
      }
      this.loading.set(true);
      const ref = this.OrdersService.addOrder(
        road,
        number,
        cardNumber,
        cvv,
        expiry,
        nameOfCard,
        this.user.id,
        this.cart
      );

      ref.subscribe(
        (data) => {
          this.snackBar.open('order confirmened', 'close');
          this.Router.navigateByUrl('/');
          this.loading.set(false);
        },
        (err) => {
          this.snackBar.open(err.error.message, 'close');
          this.loading.set(false);
        }
      );
    } else {
      if (cardNumber === 0) {
        this.error.update((value) => ({
          ...value,
          cardNumber: 'card number is required',
        }));
      }
      if (cvv === 0) {
        this.error.update((value) => ({
          ...value,
          cvv: 'cvv is required',
        }));
      }
      if (nameOfCard === '') {
        this.error.update((value) => ({
          ...value,
          nameOfCard: 'card holder name is required',
        }));
      }
      if (road === '') {
        this.error.update((value) => ({
          ...value,
          road: 'road is required',
        }));
      }
      if (expiry === '') {
        this.error.update((value) => ({
          ...value,
          expiry: 'exipry is required',
        }));
      }
      if (number === 0) {
        this.error.update((value) => ({
          ...value,
          number: 'house number is required',
        }));
      }
    }
  }
}
