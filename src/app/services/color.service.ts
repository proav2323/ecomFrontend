import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { baseUrl } from 'src/constants';
import { Colors } from 'src/models/colors';
import { map, switchMap, combineLatest } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  colors: WritableSignal<Colors[]> = signal([]);
  constructor(private httpClient: HttpClient) {}

  getAll() {
    const ref = this.httpClient.get(`${baseUrl}color/`);

    ref.subscribe((data) => {
      this.colors.set(data as Colors[]);
    });

    return ref;
  }

  add(name: string, color: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.post(
      `${baseUrl}color/add`,
      {
        name: name,
        color: color,
      },
      {
        headers: headers,
      }
    );
  }

  update(name: string, color: string, id: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.put(
      `${baseUrl}color/update/${id}`,
      {
        name: name,
        color: color,
      },
      { headers: headers }
    );
  }

  delete(id: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.delete(`${baseUrl}color/delete/${id}`, {
      headers: headers,
    });
  }

  getOne(id: string) {
    return this.httpClient
      .get<Colors | undefined>(`${baseUrl}color/${id}`)
      .toPromise();
  }
}
