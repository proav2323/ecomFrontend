import { ActivatedRoute, Router } from '@angular/router';
import { Component, WritableSignal, signal, effect } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/models/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sign } from 'crypto';
import { Colors } from 'src/models/colors';
import { ColorService } from 'src/app/services/color.service';
import { User } from 'src/models/user';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: Product | null = null;
  isLoading: WritableSignal<boolean> = signal(false);
  selectedImage = signal(0);
  colors: WritableSignal<Colors[]> = signal([]);
  selectedColor: WritableSignal<number> = signal(0);
  avgRev = 0;
  rating: number = 0;
  comment: string = '';
  user: User | null = null;
  added = signal(false);
  revLoading = signal(false);

  constructor(
    private productSrvice: ProductsService,
    private ActivatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private colorsService: ColorService,
    private UsersService: AuthService,
    private reviewsService: ReviewsService,
    private router: Router
  ) {
    effect(() => {
      this.user = this.UsersService.user();
    });
    this.ActivatedRoute.params.subscribe((data) => {
      this.isLoading.set(true);
      if (data['id']) {
        const ref = this.productSrvice.getById(String(data['id']));

        ref.subscribe(
          (data) => {
            this.product = data as Product;

            let totalStars = 0;

            this.product.reviews.forEach((data) => {
              totalStars += data.stars;
              if (this.user) {
                if (data.userId === this.user.id) {
                  this.added.set(true);
                }
              }
            });

            this.avgRev =
              totalStars >= 1 ? totalStars / this.product.reviews.length : 0;

            this.product.colors.forEach(async (da) => {
              const data = await this.colorsService.getOne(da);

              if (data !== undefined) {
                this.colors.update((value) => [...value, data]);
                console.log(this.colors());
              }
            });

            this.selectedImage.set(0);
            this.isLoading.set(false);
          },
          (Err) => {
            this.snackBar.open(Err.error.message, 'close');
            this.isLoading.set(false);
          }
        );
      }
    });
  }

  chnage(i: number) {
    this.selectedImage.set(i);
  }

  changeC(i: number) {
    this.selectedColor.set(i);
  }

  add() {
    if (this.revLoading() === false) {
      if (
        this.comment !== '' &&
        this.rating >= 1 &&
        this.user !== null &&
        this.product !== null
      ) {
        this.revLoading.set(true);
        const ref = this.reviewsService.add(
          this.user.id,
          this.comment,
          this.rating,
          this.product.id
        );

        ref.subscribe(
          (data) => {
            this.revLoading.set(false);
            this.added.set(true);
            if (this.product !== null) {
              this.snackBar.open('review added', 'close');
              const ref = this.productSrvice.getById(String(this.product.id));

              ref.subscribe(
                (data) => {
                  this.product = data as Product;
                  this.added.set(false);

                  let totalStars = 0;

                  this.product.reviews.forEach((data) => {
                    totalStars += data.stars;
                    if (this.user) {
                      if (data.userId === this.user.id) {
                        this.added.set(true);
                      }
                    }
                  });

                  this.avgRev =
                    totalStars >= 1
                      ? totalStars / this.product.reviews.length
                      : 0;
                  this.colors.set([]);
                  this.product.colors.forEach(async (da) => {
                    const data = await this.colorsService.getOne(da);

                    if (data !== undefined) {
                      this.colors.update((value) => [...value, data]);
                      console.log(this.colors());
                    }
                  });

                  this.selectedImage.set(0);
                  this.isLoading.set(false);
                },
                (Err) => {
                  this.snackBar.open(Err.error.message, 'close');
                  this.isLoading.set(false);
                }
              );
            }
          },
          (Err) => {
            this.revLoading.set(false);
            this.snackBar.open(Err.error.message, 'close');
          }
        );
      } else {
        this.snackBar.open('please provide full information to add', 'close');
      }
    }
  }

  deleteR(revId: string) {
    if (this.revLoading() === false) {
      if (this.user !== null && this.product !== null) {
        this.revLoading.set(true);
        const ref = this.reviewsService.delete(
          this.user.id,
          this.product.id,
          revId
        );

        ref.subscribe(
          (data) => {
            this.revLoading.set(false);
            this.added.set(true);
            if (this.product !== null) {
              this.snackBar.open('review deleted', 'close');
              const ref = this.productSrvice.getById(String(this.product.id));

              ref.subscribe(
                (data) => {
                  this.product = data as Product;
                  this.added.set(false);

                  let totalStars = 0;

                  this.product.reviews.forEach((data) => {
                    totalStars += data.stars;
                    if (this.user) {
                      if (data.userId === this.user.id) {
                        this.added.set(true);
                      }
                    }
                  });

                  this.avgRev =
                    totalStars >= 1
                      ? totalStars / this.product.reviews.length
                      : 0;
                  this.colors.set([]);
                  this.product.colors.forEach(async (da) => {
                    const data = await this.colorsService.getOne(da);

                    if (data !== undefined) {
                      this.colors.update((value) => [...value, data]);
                      console.log(this.colors());
                    }
                  });

                  this.selectedImage.set(0);
                  this.isLoading.set(false);
                },
                (Err) => {
                  this.snackBar.open(Err.error.message, 'close');
                  this.isLoading.set(false);
                }
              );
            }
          },
          (Err) => {
            this.revLoading.set(false);
            this.snackBar.open(Err.error.message, 'close');
          }
        );
      } else {
        this.snackBar.open('please provide full information to add', 'close');
      }
    }
  }
}
