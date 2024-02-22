import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbourdComponent } from './dashbourd/dashbourd.component';
import { AdminGuard } from './guards/admin.guard';
import { ColorsComponent } from './components/colors/colors.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductsComponent } from './components/products/products.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: '', component: DashbourdComponent },
      { path: 'colors', component: ColorsComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'reviews', component: ReviewsComponent },
    ],
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
