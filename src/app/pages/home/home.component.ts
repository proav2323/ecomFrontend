import { ProductsService } from 'src/app/services/products.service';
import { Component, effect, WritableSignal, signal } from '@angular/core';
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
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(private ProductsService: ProductsService) {
    this.isLoading.set(true);
    const ref = this.ProductsService.getAllBanners();
    ref.subscribe((data) => {
      this.products = data as Product[];
      this.isLoading.set(false);
    });
    const reff = this.ProductsService.getAllNew();
    reff.subscribe((data) => {
      this.newProducts = data as Product[];
      this.isLoading.set(false);
    });
    effect(() => {});
  }
}
