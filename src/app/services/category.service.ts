import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { baseUrl } from 'src/constants';
import { Catgeory } from 'src/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  colors: WritableSignal<Catgeory[]> = signal([]);
  constructor(private httpClient: HttpClient) {}

  getAll() {
    const ref = this.httpClient.get(`${baseUrl}category/`);

    ref.subscribe((data) => {
      this.colors.set(data as Catgeory[]);
    });

    return ref;
  }

  add(name: string, image: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.post(
      `${baseUrl}category/add`,
      {
        name: name,
        image: image,
      },
      {
        headers: headers,
      }
    );
  }

  update(name: string, image: string, id: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.put(
      `${baseUrl}category/update/${id}`,
      {
        name: name,
        image: image,
      },
      { headers: headers }
    );
  }

  delete(id: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.delete(`${baseUrl}category/delete/${id}`, {
      headers: headers,
    });
  }
}
