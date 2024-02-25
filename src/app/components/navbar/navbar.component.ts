import { ThemeService } from 'src/app/services/theme.service';
import { Component, effect, WritableSignal, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AuthService } from 'src/app/services/auth.service';
import { ROLE, User } from 'src/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: User | null = null;
  theme: string = '';
  isAdmin: WritableSignal<boolean> = signal(false);
  done: WritableSignal<boolean> = signal(false);
  url: string = '';
  constructor(
    private matDialog: MatDialog,
    private auth: AuthService,
    private themeS: ThemeService,
    private router: Router
  ) {
    effect(() => {
      this.user = this.auth.user();
      this.theme = this.themeS.theme();
    });
    this.router.events.subscribe((data) => {
      this.isAdmin.set(this.router.url.includes('/admin') ? true : false);
      this.url = this.router.url;
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY >= 40) {
        this.done.set(true);
      } else {
        this.done.set(false);
      }
    });
  }

  actions: {
    classname: string;
    ariaLabelledby: string;
    routerLink?: string;
    title: string;
  }[] = [
    {
      classname:
        'flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700',
      title: 'Actions',
      routerLink: '',
      ariaLabelledby: '',
    },
  ];

  openLogin() {
    if (window.innerWidth > 760) {
      this.matDialog.open(LoginComponent, {
        width: '30%',
      });
    } else {
      this.matDialog.open(LoginComponent, {
        width: '100%',
      });
    }
  }

  openSignUp() {
    if (window.innerWidth > 760) {
      this.matDialog.open(SignUpComponent, {
        width: '30%',
      });
    } else {
      this.matDialog.open(SignUpComponent, {
        width: '100%',
      });
    }
  }
  logout() {
    this.auth.logout();
  }
}
