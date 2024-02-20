import { ColorService } from './../../services/color.service';
import { PhotoService } from './../../services/photo.service';
import { CategoryService } from './../../services/category.service';
import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme.service';
import { Catgeory } from 'src/models/category';
import { Colors } from 'src/models/colors';
import { Product } from 'src/models/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
})
export class AddProductsComponent {
  theme: string = '';
  images: WritableSignal<string[]> = this.dataa.isEditing
    ? signal(this.dataa.product.images)
    : signal([]);
  colors: string[] = this.dataa.isEditing ? this.dataa.product.colors : [];
  showColors: Colors[] = [];
  catgeory: Catgeory[] = [];
  allColors: Colors[] = [];
  error: WritableSignal<{
    name: string;
    description: string;
    price: string;
    company: string;
    new: string;
    onBanner: string;
    stcok: string;
    category: string;
    bannerText: string;
    cta: string;
  }> = signal({
    bannerText: '',
    category: '',
    company: '',
    cta: '',
    description: '',
    name: '',
    new: '',
    onBanner: '',
    price: '',
    stcok: '',
  });
  loading: WritableSignal<boolean> = signal(false);
  constructor(
    private themeServive: ThemeService,
    private CategoryService: CategoryService,
    private PhotoService: PhotoService,
    private ColorService: ColorService,
    private SnackBar: MatSnackBar,
    private productService: ProductsService,
    private ref: MatDialogRef<AddProductsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dataa: { isEditing: boolean; product: Product }
  ) {
    if (this.dataa.isEditing) {
      this.dataa.product.colors.forEach((data) => {
        this.productService.getColors(data).subscribe((data) => {
          this.showColors.push(data as Colors);
        });
      });
    }
    effect(() => {
      this.theme = this.themeServive.theme();
      this.catgeory = this.CategoryService.colors();
      this.allColors = this.ColorService.colors();
    });

    this.CategoryService.getAll();
    this.ColorService.getAll();
  }

  @ViewChild('name') name!: ElementRef<HTMLInputElement>;
  @ViewChild('description') description!: ElementRef<HTMLInputElement>;
  @ViewChild('price') price!: ElementRef<HTMLInputElement>;
  @ViewChild('company') company!: ElementRef<HTMLInputElement>;
  @ViewChild('stock') stock!: ElementRef<HTMLInputElement>;
  @ViewChild('bannerText') bannerText!: ElementRef<HTMLInputElement>;
  @ViewChild('cta') cta!: ElementRef<HTMLInputElement>;
  @ViewChild('categoryId') categoryId!: ElementRef<HTMLSelectElement>;
  data: FormGroup = new FormGroup({
    name: new FormControl(this.dataa.isEditing ? this.dataa.product.name : '', [
      Validators.required,
    ]),
    description: new FormControl(
      this.dataa.isEditing ? this.dataa.product.description : '',
      [Validators.required]
    ),
    price: new FormControl(
      this.dataa.isEditing ? this.dataa.product.price : 0,
      [Validators.required]
    ),
    company: new FormControl(
      this.dataa.isEditing ? this.dataa.product.company : '',
      [Validators.required]
    ),
    new: new FormControl(
      this.dataa.isEditing ? this.dataa.product.new : false,
      [Validators.required]
    ),
    onBanner: new FormControl(
      this.dataa.isEditing ? this.dataa.product.onBanner : false,
      [Validators.required]
    ),
    stock: new FormControl(
      this.dataa.isEditing ? this.dataa.product.stock : 0,
      [Validators.required]
    ),
    categoryId: new FormControl(
      this.dataa.isEditing ? this.dataa.product.category.id : '',
      [Validators.required]
    ),
    bannerText: new FormControl(
      this.dataa.isEditing ? this.dataa.product.bannerText : ''
    ),
    cta: new FormControl(this.dataa.isEditing ? this.dataa.product.cta : ''),
    colorId: new FormControl(''),
  });

  addImg(e: any) {
    if (this.loading() === true) {
      return;
    }
    this.PhotoService.add(e.target.files[0], this.images, this.loading, true);
  }

  remove(id: string) {
    this.images.update((value) => value.filter((data) => data !== id));
  }

  addColor() {
    if (this.data.controls['colorId'].value) {
      const color = this.allColors.find(
        (data) => data.id === this.data.controls['colorId'].value
      );
      if (color) {
        this.showColors.push(color);
      }
      this.colors.push(this.data.controls['colorId'].value);
    }
  }

  removeColor(is: string) {
    this.showColors = this.showColors.filter((datra) => datra.id !== is);
    this.colors = this.colors.filter((datra) => datra !== is);
  }

  edit() {
    this.error.set({
      name: '',
      description: '',
      bannerText: '',
      category: '',
      company: '',
      cta: '',
      new: '',
      onBanner: '',
      price: '',
      stcok: '',
    });
    if (
      this.data.valid &&
      this.images().length >= 1 &&
      this.colors.length >= 1
    ) {
      if (
        this.data.controls['onBanner'].value === true &&
        this.data.controls['bannerText'].value === '' &&
        this.data.controls['cta'].value === ''
      ) {
        if (
          this.data.controls['bannerText'].value === '' &&
          this.data.controls['onBanner'].value === true
        ) {
          this.bannerText.nativeElement.focus();
          this.error.set({
            ...this.error(),
            bannerText: "banner Text when it's on banner",
          });
        }

        if (
          this.data.controls['cta'].value === '' &&
          this.data.controls['onBanner'].value === true
        ) {
          this.cta.nativeElement.focus();
          this.error.set({
            ...this.error(),
            cta: "banner Text when it's on banner",
          });
        }
        return;
      }
      this.loading.set(true);
      const ref = this.productService.update(
        this.dataa.product.id,
        this.data.controls['name'].value!,
        this.data.controls['description'].value!,
        this.data.controls['categoryId'].value!,
        this.images(),
        this.colors,
        this.data.controls['price'].value!,
        this.data.controls['company'].value!,
        this.data.controls['new'].value!,
        this.data.controls['onBanner'].value!,
        this.data.controls['stock'].value!,
        this.data.controls['cta'].value === ''
          ? undefined
          : this.data.controls['cta'].value!,
        this.data.controls['bannerText'].value === ''
          ? undefined
          : this.data.controls['bannerText'].value!
      );

      ref.subscribe(
        () => {
          this.productService.getAll();
          this.SnackBar.open('product updated', 'close');
          this.loading.set(false);
          this.ref.close();
        },
        (err) => {
          this.loading.set(false);
          this.SnackBar.open(err.error.message, 'close');
          console.log(err);
        }
      );
    } else {
      if (this.data.controls['name'].hasError('required')) {
        this.name.nativeElement.focus();
        this.error.set({ ...this.error(), name: 'name is required' });
      }

      if (this.data.controls['description'].hasError('required')) {
        this.description.nativeElement.focus();
        this.error.set({
          ...this.error(),
          description: 'description is required',
        });
      }

      if (this.data.controls['price'].hasError('required')) {
        this.price.nativeElement.focus();
        this.error.set({ ...this.error(), price: 'price is required' });
      }

      if (this.data.controls['company'].hasError('required')) {
        this.company.nativeElement.focus();
        this.error.set({ ...this.error(), company: 'company is required' });
      }

      if (this.data.controls['stock'].hasError('required')) {
        this.stock.nativeElement.focus();
        this.error.set({
          ...this.error(),
          stcok: 'stock is required',
        });
      }

      if (
        this.data.controls['bannerText'].value === '' &&
        this.data.controls['onBanner'].value === true
      ) {
        this.bannerText.nativeElement.focus();
        this.error.set({
          ...this.error(),
          bannerText: "banner Text when it's on banner",
        });
      }

      if (
        this.data.controls['cta'].value === '' &&
        this.data.controls['onBanner'].value === true
      ) {
        this.cta.nativeElement.focus();
        this.error.set({
          ...this.error(),
          cta: "banner Text when it's on banner",
        });
      }

      if (
        this.data.controls['categoryId'].hasError('required') ||
        this.data.controls['categoryId'].value === '' ||
        this.data.controls['categoryId'].value === null ||
        this.data.controls['categoryId'].value === undefined
      ) {
        this.categoryId.nativeElement.focus();
        this.error.set({
          ...this.error(),
          category: 'category is required',
        });
      }

      if (this.images().length === 0) {
        this.SnackBar.open("there's should be one image", 'close');
      }

      if (this.colors.length === 0) {
        this.SnackBar.open("there's should be one color", 'close');
      }
    }
  }

  add() {
    this.error.set({
      name: '',
      description: '',
      bannerText: '',
      category: '',
      company: '',
      cta: '',
      new: '',
      onBanner: '',
      price: '',
      stcok: '',
    });
    if (
      this.data.valid &&
      this.images().length >= 1 &&
      this.colors.length >= 1
    ) {
      if (
        this.data.controls['onBanner'].value === true &&
        this.data.controls['bannerText'].value === '' &&
        this.data.controls['cta'].value === ''
      ) {
        if (
          this.data.controls['bannerText'].value === '' &&
          this.data.controls['onBanner'].value === true
        ) {
          this.bannerText.nativeElement.focus();
          this.error.set({
            ...this.error(),
            bannerText: "banner Text when it's on banner",
          });
        }

        if (
          this.data.controls['cta'].value === '' &&
          this.data.controls['onBanner'].value === true
        ) {
          this.cta.nativeElement.focus();
          this.error.set({
            ...this.error(),
            cta: "banner Text when it's on banner",
          });
        }
        return;
      }
      this.loading.set(true);
      const ref = this.productService.add(
        this.data.controls['name'].value!,
        this.data.controls['description'].value!,
        this.data.controls['categoryId'].value!,
        this.images(),
        this.colors,
        this.data.controls['price'].value!,
        this.data.controls['company'].value!,
        this.data.controls['new'].value!,
        this.data.controls['onBanner'].value!,
        this.data.controls['stock'].value!,
        this.data.controls['cta'].value === ''
          ? undefined
          : this.data.controls['cta'].value!,
        this.data.controls['bannerText'].value === ''
          ? undefined
          : this.data.controls['bannerText'].value!
      );

      ref.subscribe(
        () => {
          this.productService.getAll();
          this.SnackBar.open('product added', 'close');
          this.loading.set(false);
          this.ref.close();
        },
        (err) => {
          this.loading.set(false);
          this.SnackBar.open(err.error.message, 'close');
          console.log(err);
        }
      );
    } else {
      if (this.data.controls['name'].hasError('required')) {
        this.name.nativeElement.focus();
        this.error.set({ ...this.error(), name: 'name is required' });
      }

      if (this.data.controls['description'].hasError('required')) {
        this.description.nativeElement.focus();
        this.error.set({
          ...this.error(),
          description: 'description is required',
        });
      }

      if (this.data.controls['price'].hasError('required')) {
        this.price.nativeElement.focus();
        this.error.set({ ...this.error(), price: 'price is required' });
      }

      if (this.data.controls['company'].hasError('required')) {
        this.company.nativeElement.focus();
        this.error.set({ ...this.error(), company: 'company is required' });
      }

      if (this.data.controls['stock'].hasError('required')) {
        this.stock.nativeElement.focus();
        this.error.set({
          ...this.error(),
          stcok: 'stock is required',
        });
      }

      if (
        this.data.controls['bannerText'].value === '' &&
        this.data.controls['onBanner'].value === true
      ) {
        this.bannerText.nativeElement.focus();
        this.error.set({
          ...this.error(),
          bannerText: "banner Text when it's on banner",
        });
      }

      if (
        this.data.controls['cta'].value === '' &&
        this.data.controls['onBanner'].value === true
      ) {
        this.cta.nativeElement.focus();
        this.error.set({
          ...this.error(),
          cta: "banner Text when it's on banner",
        });
      }

      if (
        this.data.controls['categoryId'].hasError('required') ||
        this.data.controls['categoryId'].value === '' ||
        this.data.controls['categoryId'].value === null ||
        this.data.controls['categoryId'].value === undefined
      ) {
        this.categoryId.nativeElement.focus();
        this.error.set({
          ...this.error(),
          category: 'category is required',
        });
      }

      if (this.images().length === 0) {
        this.SnackBar.open("there's should be one image", 'close');
      }

      if (this.colors.length === 0) {
        this.SnackBar.open("there's should be one color", 'close');
      }
    }
  }
}
