import { Component, effect, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Colors } from 'src/models/colors';
import { AddColorComponent } from '../add-color/add-color.component';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { AddProductsComponent } from '../add-products/add-products.component';
import { User } from 'src/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { InputSwitchChangeEvent } from 'primeng/inputswitch';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  theme: string = '';
  products: User[] = [];
  loading = signal(false);
  displayedColumns: string[] = ['id', 'name', 'role', 'actions'];
  dataSource = [...this.products];
  options = [
    { name: 'USER', value: 'USER' },
    { name: 'ADMIN', value: 'ADMIN' },
  ];
  role: any[] = [];
  @ViewChild(MatTable) table!: MatTable<Colors>;
  constructor(
    private themeService: ThemeService,
    private colorsService: AuthService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.colorsService.getAll();
    effect(() => {
      this.theme = this.themeService.theme();
      this.products = this.colorsService.users();
      this.dataSource =
        this.products === null
          ? []
          : this.products.length === 0
          ? []
          : [...this.products];
    });
  }

  openAdd() {
    if (window.innerWidth > 760) {
      const ref = this.matDialog.open(SignUpComponent, {
        width: '50%',
        data: {
          isEditing: true,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    } else {
      const ref = this.matDialog.open(SignUpComponent, {
        width: '100%',
        data: {
          isEditing: true,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    }
  }

  deleteH(id: string) {
    const ref = this.colorsService.delete(id);
    ref.subscribe(
      () => {
        this.colorsService.getAll();
        this.table.renderRows();
        this.snackBar.open('user deleted', 'close');
      },
      (Err) => {
        this.snackBar.open(Err.error.message, 'close');
      }
    );
  }

  update(id: string, e: any) {
    if (this.loading() === false) {
      this.loading.set(true);
      const ref = this.colorsService.upadateA(
        e.target.checked === true ? 'ADMIN' : 'USER',
        id
      );
      ref.subscribe(
        () => {
          this.snackBar.open('user upadeted', 'close');
          this.colorsService.getAll();
          this.table.renderRows();
          this.loading.set(false);
        },
        (Err) => {
          this.loading.set(false);
          this.snackBar.open(Err.error.message, 'close');
        }
      );
    }
    console.log(this.role);
  }
}
