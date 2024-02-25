import { Component, WritableSignal, signal, effect } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductsService } from 'src/app/services/products.service';
import { Catgeory } from 'src/models/category';
import { Colors } from 'src/models/colors';
import { Product } from 'src/models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  isLoading: WritableSignal<boolean> = signal(false);
  products: WritableSignal<Product[]> = signal([]);
  category: Catgeory[] = [];
  color: Colors[] = [];
  data: Params = {};
  companyies: string[] = [];
  price: number = 0;
  constructor(
    private activtedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private colorService: ColorService,
    private router: Router
  ) {
    this.activtedRoute.queryParams.subscribe((data) => {
      this.data = data;
      this.isLoading.set(true);
      if (data['price']) {
        this.price = data['price'];
      }
      const rfe = this.productsService.getQuery(data);

      rfe.subscribe(
        (data) => {
          this.products.set(data as Product[]);
          this.isLoading.set(false);
        },
        (err) => {
          this.snackBar.open(err.error.message, 'close');
          this.isLoading.set(false);
        }
      );
    });

    effect(() => {
      this.category = this.categoryService.colors();
      this.color = this.colorService.colors();
      this.companyies = this.productsService
        .colors()
        .map((data) => data.company);
    });

    this.categoryService.getAll();
    this.colorService.getAll();
    this.productsService.getAll();
  }

  change(id: string, value: string | number) {
    if (id === 'price') {
      if (value === 0) {
        this.remove(id);
        return;
      }
    }
    let obj: any = {};
    obj[id] = value;
    this.router.navigate(['/products'], {
      queryParams: { ...this.data, ...obj },
      queryParamsHandling: 'merge',
    });
  }
  remove(id: string) {
    const data: any = {};
    data[id] = null;
    this.router.navigate(['/products'], {
      queryParams: { ...this.data, ...data },
      queryParamsHandling: 'merge',
    });
  }
}
