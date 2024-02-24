import { ProductsService } from 'src/app/services/products.service';
import { Component, effect } from '@angular/core';
import { Product } from 'src/models/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Product[] = [];
  newProducts: Product[] = [];
  responsiveOptions: any[] | undefined;

  constructor(private ProductsService: ProductsService) {
    const ref = this.ProductsService.getAllBanners();

    ref.subscribe((data) => {
      this.products = data as Product[];
    });
    effect(() => {});
  }
}
