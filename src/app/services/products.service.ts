import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { map } from 'rxjs';
import { baseUrl } from 'src/constants';
import { Colors } from 'src/models/colors';
import { Product } from 'src/models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  colors: WritableSignal<Product[]> = signal([]);
  constructor(private httpClient: HttpClient) {}

  getAll() {
    const ref = this.httpClient.get(`${baseUrl}products/`);

    ref.subscribe((data) => {
      this.colors.set(data as Product[]);
    });

    return ref;
  }

  getAllBanners() {
    const ref = this.httpClient.get(`${baseUrl}products/featured`);

    return ref;
  }

  add(
    name: string,
    description: string,
    categoryId: string,
    images: string[],
    colors: string[],
    price: number,
    company: string,
    isNew: boolean,
    onBanner: boolean,
    stock: number,
    bannerText?: string,
    cta?: string
  ) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.post(
      `${baseUrl}products/add`,
      {
        name: name,
        description: description,
        categoryId: categoryId,
        price: price,
        images: images,
        colors: colors,
        company: company,
        onBanner: onBanner,
        isNew: isNew,
        bannerText: bannerText ? bannerText : undefined,
        cta: cta ? cta : undefined,
        stock: stock,
      },
      {
        headers: headers,
      }
    );
  }

  update(
    id: string,
    name: string,
    description: string,
    categoryId: string,
    images: string[],
    colors: string[],
    price: number,
    company: string,
    isNew: boolean,
    onBanner: boolean,
    stock: number,
    bannerText?: string,
    cta?: string
  ) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.put(
      `${baseUrl}products/update/${id}`,
      {
        name: name,
        description: description,
        categoryId: categoryId,
        price: price,
        images: images,
        colors: colors,
        company: company,
        onBanner: onBanner,
        isNew: isNew,
        bannerText: bannerText ? bannerText : undefined,
        cta: cta ? cta : undefined,
        stock: stock,
      },
      { headers: headers }
    );
  }

  delete(id: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.delete(`${baseUrl}products/delete/${id}`, {
      headers: headers,
    });
  }

  getColors(id: string) {
    const col = this.httpClient.get(`${baseUrl}color/${id}`);
    return col;
  }
}
