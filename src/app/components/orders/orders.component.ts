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
import { orders } from 'src/models/orders';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  theme: string = '';
  products: orders[] = [];
  loading = signal(false);
  displayedColumns: string[] = ['id', 'userName', 'status', 'actions'];
  dataSource = [...this.products];
  role: any[] = [];
  options = ['ORDERED', 'SHIPPED', 'OUTONDELIVERY', 'DELIVERED'];
  @ViewChild(MatTable) table!: MatTable<Colors>;
  constructor(
    private themeService: ThemeService,
    private colorsService: OrdersService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.colorsService.getAll();
    effect(() => {
      this.theme = this.themeService.theme();
      this.products = this.colorsService.orders();
      this.dataSource =
        this.products === null
          ? []
          : this.products.length === 0
          ? []
          : [...this.products];
    });
  }

  openAdd(id: string) {
    if (window.innerWidth > 760) {
      const ref = this.matDialog.open(OrderDetailsComponent, {
        width: '50%',
        data: {
          id: id,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    } else {
      const ref = this.matDialog.open(OrderDetailsComponent, {
        width: '100%',
        data: {
          id: id,
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
        this.snackBar.open('order deleted', 'close');
      },
      (Err) => {
        this.snackBar.open(Err.error.message, 'close');
      }
    );
  }

  update(id: string, e: any) {
    if (this.loading() === false) {
      this.loading.set(true);
      const ref = this.colorsService.update(id, e.target.value);
      ref.subscribe(
        () => {
          this.snackBar.open('order upadeted', 'close');
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
