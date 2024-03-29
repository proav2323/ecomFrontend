import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { baseUrl } from 'src/constants';
import { User } from 'src/models/user';
import * as jsonwebtoken from 'jsonwebtoken';
import { Route, Router } from '@angular/router';
import { first, take, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: WritableSignal<User | null> = signal(null);
  users: WritableSignal<User[]> = signal([]);
  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  login(email: string, password: string) {
    const ref = this.httpClient.post(`${baseUrl}auth/login`, {
      email: email,
      password: password,
    });

    return ref;
  }

  signUp(email: string, password: string, name: string, role: string) {
    const ref = this.httpClient.post(`${baseUrl}auth/signUp`, {
      email: email,
      password: password,
      name: name,
      role: role,
    });

    return ref;
  }

  getUser(id: string) {
    const ref = this.httpClient.get(`${baseUrl}auth/${id}`);

    ref.subscribe(
      (value) => {
        if (value !== undefined) {
          this.user.set(value as User);
        } else {
          this.user.set(null);
        }
      },
      (err) => {
        this.snackBar.open('something went wrong', 'close');
      }
    );
  }

  getUserr(id: string) {
    const ref = this.httpClient.get(`${baseUrl}auth/${id}`);

    return ref;
  }

  decodeToken(toekn: string) {
    const val = this.httpClient.get(`${baseUrl}auth/decode/${toekn}`);
    return val;
  }

  logout() {
    localStorage.removeItem('token');
    this.user.set(null);
  }

  getAll() {
    const token = localStorage.getItem('token') ?? '';
    if (token === '') {
      console.log('dmfksna');
      return;
    }
    const ref = this.decodeToken(token);
    ref.subscribe((data: any) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      this.httpClient
        .get(`${baseUrl}auth/admin/${data['email']}`, { headers: headers })
        .subscribe((data) => {
          this.users.set(data as User[]);
        });
    });
  }

  upadateA(role: string, id: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.put(
      `${baseUrl}auth/admin/update/${id}`,
      { role: role },
      { headers: headers }
    );
  }

  delete(id: string) {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.delete(`${baseUrl}auth/admin/delete/${id}`, {
      headers: headers,
    });
  }
}
