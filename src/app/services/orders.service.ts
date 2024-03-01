import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { baseUrl } from 'src/constants';
import { Cart } from 'src/models/Cart';
import { orders } from 'src/models/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders: WritableSignal<orders[]> = signal([]);
  constructor(private httpClient: HttpClient) {}

  getAll() {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpClient
      .get(`${baseUrl}order/`, { headers: headers })
      .subscribe((data) => {
        this.orders.set(data as orders[]);
      });
  }

  delete(id: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.httpClient.delete(`${baseUrl}order/delete/${id}`, {
      headers: headers,
    });
  }

  update(id: string, statuts: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.httpClient.put(
      `${baseUrl}order/update/${id}`,
      {
        status: statuts,
      },
      { headers: headers }
    );
  }

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
