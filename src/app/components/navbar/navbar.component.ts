import { Component, effect } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: User | null = null;
  constructor(private matDialog: MatDialog, private auth: AuthService) {
    effect(() => {
      this.user = this.auth.user();
    });
  }

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
}
