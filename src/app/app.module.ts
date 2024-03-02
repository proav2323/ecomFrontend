import { OrdersService } from './services/orders.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModeSwitchComponent } from './components/mode-switch/mode-switch.component';
import {
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MatIconModule } from '@angular/material/icon';
import { HeadingComponent } from './components/heading/heading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashbourdComponent } from './dashbourd/dashbourd.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { PhotoService } from './services/photo.service';
import { ThemeService } from './services/theme.service';
import { ColorsComponent } from './components/colors/colors.component';
import { CategoryComponent } from './components/category/category.component';
import { MatTableModule } from '@angular/material/table';
import { ColorService } from './services/color.service';
import { CategoryService } from './services/category.service';
import { AddColorComponent } from './components/add-color/add-color.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ProductsService } from './services/products.service';
import { ProductsComponent } from './components/products/products.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatSelectModule } from '@angular/material/select';
import { PrismaServiceService } from './services/prisma-service.service';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewComponent } from './components/review/review.component';
import { RatingModule } from 'primeng/rating';
import { UserComponent } from './components/user/user.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CarouselModule } from 'primeng/carousel';
import { HomeComponent } from './pages/home/home.component';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { ProductCardsComponent } from './components/product-cards/product-cards.component';
import { MatCardModule } from '@angular/material/card';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductsComponent as pc } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartService } from './services/cart.service';
import { CartComponent } from './pages/cart/cart.component';
import { CartproductcardComponent } from './components/cartproductcard/cartproductcard.component';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { OrderCartComponent } from './components/order-cart/order-cart.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ModeSwitchComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    HeadingComponent,
    DropdownComponent,
    DashbourdComponent,
    ColorsComponent,
    CategoryComponent,
    AddColorComponent,
    AddCategoryComponent,
    ProductsComponent,
    AddProductsComponent,
    ReviewsComponent,
    ReviewComponent,
    UserComponent,
    HomeComponent,
    ProductCardsComponent,
    CarouselComponent,
    pc,
    ProductDetailsComponent,
    CartComponent,
    CartproductcardComponent,
    SearchComponent,
    CheckoutComponent,
    OrdersComponent,
    OrderDetailsComponent,
    UserOrdersComponent,
    OrderCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    DropdownModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    InputSwitchModule,
    MultiSelectModule,
    MatSelectModule,
    RatingModule,
    OverlayPanelModule,
    CarouselModule,
    IgxCarouselModule,
    IgxSliderModule,
    MatCardModule,
  ],
  providers: [
    AuthService,
    PhotoService,
    ThemeService,
    ColorService,
    CategoryService,
    ProductsService,
    PrismaServiceService,
    CartService,
    OrdersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
