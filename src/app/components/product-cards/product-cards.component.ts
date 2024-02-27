import { Component, Input, OnInit, effect } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CartService } from 'src/app/services/cart.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Product } from 'src/models/products';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css',
})
export class ProductCardsComponent implements OnInit {
  @Input() product!: Product;
  theme: string = '';
  constructor(
    private theService: ThemeService,
    private cartService: CartService
  ) {
    effect(() => {
      this.theme = this.theService.theme();
    });
  }

  ngOnInit(): void {
    if (!this.product) {
    }
  }

  addToCart(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (this.product !== null) {
      this.cartService.addToCart(
        this.product.id,
        this.product.colors[0],
        1,
        this.product.price
      );
    }
  }
}
