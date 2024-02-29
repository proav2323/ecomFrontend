import {
  Component,
  Inject,
  Input,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductsService } from 'src/app/services/products.service';
import { Items } from 'src/models/Cart';
import { Colors } from 'src/models/colors';
import { Product } from 'src/models/products';

@Component({
  selector: 'app-cartproductcard',
  templateUrl: './cartproductcard.component.html',
  styleUrl: './cartproductcard.component.css',
})
export class CartproductcardComponent implements OnInit {
  @Input() item!: Items;
  product!: Product;
  color: Colors | undefined = undefined;
  isLoading: WritableSignal<boolean> = signal(false);
  cutName: string = '';

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    const ref = this.productService.getById(this.item.productId);

    ref.subscribe(async (data) => {
      this.product = data as Product;
      window.innerWidth >= 1024
        ? (this.cutName = this.product.name)
        : (this.cutName =
            this.product.name.length <= 10
              ? this.product.name
              : this.product.name.substring(0, 8) + '...');
      window.addEventListener('resize', () => {
        window.innerWidth >= 1024
          ? (this.cutName = this.product.name)
          : (this.cutName =
              this.product.name.length <= 10
                ? this.product.name
                : this.product.name.substring(0, 8) + '...');
      });
      this.color = await this.colorService.getOne(this.item.colorId);
    });
  }

  updateQty(plus: boolean) {
    if (this.isLoading() === false) {
      if (this.item.Qty === 1 && plus === false) {
        return;
      }
      this.cartService.updateProduct(
        this.item.productId,
        this.item.colorId,
        plus === true ? +1 : -1,
        this.isLoading
      );
    }
  }

  removeItem() {
    this.cartService.removeItem(this.item.productId);
  }
}
