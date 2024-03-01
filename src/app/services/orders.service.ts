import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/constants';
import { Cart } from 'src/models/Cart';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  addOrder(
    road: string,
    number: number,
    cardNumber: number,
    cvv: number,
    expiry: string,
    name: string,
    userId: string,
    cart: Cart
  ) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.post(
      `${baseUrl}order/add`,
      {
        userId: userId,
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty,
        cart: cart,
        method: 'Card',
        cardNumber: cardNumber,
        cvv: cvv,
        nameOfCard: name,
        expiry: expiry,
        status: 'ORDERED',
        address: {
          road: road,
          number: number,
        },
      },
      { headers: headers }
    );
  }
}
