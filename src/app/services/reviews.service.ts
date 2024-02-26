import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { baseUrl } from 'src/constants';
import { Reviews } from 'src/models/reviews';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  reviews: WritableSignal<Reviews[]> = signal([]);
  constructor(private httpClient: HttpClient) {}

  getAll() {
    this.httpClient.get(`${baseUrl}reviews`).subscribe((data) => {
      this.reviews.set(data as Reviews[]);
    });
  }

  getOne(id: string) {
    return this.httpClient.get(`${baseUrl}reviews/${id}`);
  }

  add(userId: string, comment: string, rating: number, productId: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.httpClient.post(
      `${baseUrl}reviews/add`,
      { userId: userId, productId: productId, comment: comment, stars: rating },
      { headers: headers }
    );
  }

  delete(userId: string, productId: string, id: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.httpClient.delete(
      `${baseUrl}reviews/delete/${id}/${userId}/${productId}`,
      { headers: headers }
    );
  }
}
