import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { IStaticMethods } from 'preline/preline';
import { AuthService } from './services/auth.service';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ECOMM';
  show: WritableSignal<boolean> = signal(false);

  constructor(private router: Router, private authService: AuthService) {
    const value = localStorage.getItem('token') ?? '';
    const val = this.authService.decodeToken(value as string);
    val.subscribe((va: any) => {
      this.authService.getUser(va['id']);
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.show.set(true);
      } else {
        this.show.set(false);
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }
}
