import { Component, effect, OnInit, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Colors } from 'src/models/colors';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { User } from 'src/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { InputSwitchChangeEvent } from 'primeng/inputswitch';
import { orders } from 'src/models/orders';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderDetailsComponent } from 'src/app/components/order-details/order-details.component';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css',
})
export class UserOrdersComponent implements OnInit {
  theme: string = '';
  products: orders[] = [];
  loading = signal(false);
  displayedColumns: string[] = ['id', 'userName', 'status', 'actions'];
  dataSource = [...this.products];
  role: any[] = [];
  options = ['ORDERED', 'SHIPPED', 'OUTONDELIVERY', 'DELIVERED'];
  user: User | null = null;
  @ViewChild(MatTable) table!: MatTable<Colors>;
  constructor(
    private themeService: ThemeService,
    private colorsService: OrdersService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private autHservice: AuthService
  ) {
    effect(() => {
      this.theme = this.themeService.theme();
      this.products = this.colorsService.userOrders();
      this.user = this.autHservice.user();

      this.dataSource =
        this.products === null
          ? []
          : this.products.length === 0
          ? []
          : [...this.products];
    });
    setTimeout(() => {
      if (this.user !== null) {
        this.colorsService.getUserOrders(this.user.id);
        console.log('kljl');
      }
    }, 500);
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

  ngOnInit(): void {}
}
