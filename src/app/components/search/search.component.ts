import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  WritableSignal,
  signal,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/models/products';
import { sign } from 'crypto';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, AfterViewInit {
  isLoading: WritableSignal<boolean> = signal(false);
  products: WritableSignal<Product[]> = signal([]);
  search = '';
  @ViewChild('text') text!: ElementRef<HTMLInputElement>;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {
    this.ActivatedRoute.queryParams.subscribe((data) => {
      this.isLoading.set(true);
      if (data['search']) {
        this.search = data['search'];
        const ref = this.productService.getSearchedProducts(data['search']);
        ref.subscribe((data) => {
          this.products.set(data as Product[]);
          this.isLoading.set(false);
        });
      } else {
        const ref = this.productService.getSearchedProducts('');
        ref.subscribe((data) => {
          this.products.set(data as Product[]);
          this.isLoading.set(false);
        });
      }
    });
  }
  nav() {
    this.router.navigate(['/search'], {
      queryParams: { search: this.search },
      queryParamsHandling: 'merge',
    });
  }

  check(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      console.log('lkl');
      this.nav();
    }
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
}
