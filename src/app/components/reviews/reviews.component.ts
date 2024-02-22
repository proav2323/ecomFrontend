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
import { ReviewsService } from 'src/app/services/reviews.service';
import { Reviews } from 'src/models/reviews';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  theme: string = '';
  products: Reviews[] = [];
  displayedColumns: string[] = ['id', 'comment', 'stars', 'actions'];
  dataSource = [...this.products];
  @ViewChild(MatTable) table!: MatTable<Colors>;
  constructor(
    private themeService: ThemeService,
    private colorsService: ReviewsService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.colorsService.getAll();
    effect(() => {
      this.theme = this.themeService.theme();
      this.products = this.colorsService.reviews();
      this.dataSource = [...this.products];
    });
  }

  openAdd(id: string) {
    if (window.innerWidth > 760) {
      const ref = this.matDialog.open(ReviewComponent, {
        width: '30%',
        data: {
          id: id,
        },
      });
    } else {
      const ref = this.matDialog.open(ReviewComponent, {
        width: '100%',
        data: {
          id: id,
        },
      });
    }
  }
}
