import { HttpClient } from '@angular/common/http';
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
}
