import { Component, Input, OnInit, effect } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
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
  constructor(private theService: ThemeService) {
    effect(() => {
      this.theme = this.theService.theme();
    });
  }

  ngOnInit(): void {
    if (!this.product) {
    }
  }
}
