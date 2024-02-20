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
  ],
  providers: [
    AuthService,
    PhotoService,
    ThemeService,
    ColorService,
    CategoryService,
    ProductsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
