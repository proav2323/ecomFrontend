import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private matDialog: MatDialog) {}

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
}
