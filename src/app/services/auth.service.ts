import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const ref = this.httpClient.post(`${baseUrl}auth/login`, {
      email: email,
      password: password,
    });

    return ref;
  }
}
