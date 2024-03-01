import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbourdComponent } from './dashbourd/dashbourd.component';
import { AdminGuard } from './guards/admin.guard';
import { ColorsComponent } from './components/colors/colors.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductsComponent } from './components/products/products.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent as pc } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: '', component: DashbourdComponent },
      { path: 'colors', component: ColorsComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'users', component: UserComponent },
    ],
    canActivate: [AdminGuard],
  },
  { path: '', component: HomeComponent },
  { path: 'products', component: pc },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
