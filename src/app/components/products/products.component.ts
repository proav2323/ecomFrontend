import { Component, effect, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  theme: string = '';
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'price', 'actions'];
  dataSource = [...this.products];
  @ViewChild(MatTable) table!: MatTable<Colors>;
  constructor(
    private themeService: ThemeService,
    private colorsService: ProductsService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.colorsService.getAll();
    effect(() => {
      this.theme = this.themeService.theme();
      this.products = this.colorsService.colors();
      this.dataSource = [...this.products];
    });
  }

  openAdd() {
    if (window.innerWidth > 760) {
      const ref = this.matDialog.open(AddProductsComponent, {
        width: '50%',
        data: {
          isEditing: false,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    } else {
      const ref = this.matDialog.open(AddProductsComponent, {
        width: '100%',
        data: {
          isEditing: false,
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
        this.snackBar.open('product deleted', 'close');
      },
      (Err) => {
        this.snackBar.open(Err.error.message, 'close');
      }
    );
  }

  openEdit(color: Product) {
    if (window.innerWidth > 760) {
      const ref = this.matDialog.open(AddProductsComponent, {
        width: '50%',
        data: {
          isEditing: true,
          product: color,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    } else {
      const ref = this.matDialog.open(AddProductsComponent, {
        width: '100%',
        data: {
          isEditing: true,
          product: color,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    }
  }
}
