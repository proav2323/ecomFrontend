import {
  Component,
  WritableSignal,
  signal,
  effect,
  Input,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorService } from 'src/app/services/color.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Catgeory } from 'src/models/category';
import { CategoryService } from '../services/category.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  loading: WritableSignal<boolean> = signal(false);
  error: WritableSignal<{ name: string; color: string }> = signal({
    name: '',
    color: '',
  });
  theme: string = '';
  image: WritableSignal<string> = signal('');
  @ViewChild('name') name!: ElementRef<HTMLInputElement>;
  @ViewChild('color') color!: ElementRef<HTMLInputElement>;
  constructor(
    private colorS: CategoryService,
    private ref: MatDialogRef<AddCategoryComponent>,
    private snackBar: MatSnackBar,
    private ThemeS: ThemeService,
    private photService: PhotoService,
    @Inject(MAT_DIALOG_DATA)
    public dataa: { isEditing: boolean; category: Catgeory }
  ) {
    effect(() => {
      this.theme = this.ThemeS.theme();
    });

    this.dataa.isEditing ? this.image.set(this.dataa.category.image) : () => {};

    this.data.valueChanges.subscribe(() => {
      console.log(this.data.controls['color'].value);
    });
  }

  data: FormGroup = new FormGroup({
    name: new FormControl(
      this.dataa.isEditing ? this.dataa.category.name : '',
      [Validators.required]
    ),
  });

  add() {
    this.error.set({ name: '', color: '' });
    if (this.data.valid && this.image() !== '') {
      this.loading.set(true);
      const ref = this.colorS.add(
        this.data.controls['name'].value!,
        this.image()
      );

      ref.subscribe(
        () => {
          this.colorS.getAll();
          this.ref.close();
          this.snackBar.open('category added', 'close');
          this.loading.set(false);
        },
        (Err) => {
          this.snackBar.open(Err.error.message, 'close');
          this.loading.set(false);
        }
      );
    } else {
      if (!this.data.controls['name'].valid) {
        this.name.nativeElement.focus();
        this.error.set({ ...this.error(), name: 'name is required' });
      }
      if (this.image() === '') {
        this.snackBar.open('image is required', 'close');
      }
    }
  }

  edit() {
    this.error.set({ name: '', color: '' });
    if (this.data.valid && this.image() !== '') {
      this.loading.set(true);
      const ref = this.colorS.update(
        this.data.controls['name'].value!,
        this.image(),
        this.dataa.category.id
      );

      ref.subscribe(
        () => {
          this.colorS.getAll();
          this.ref.close();
          this.snackBar.open('category edited', 'close');
          this.loading.set(false);
        },
        (Err) => {
          this.snackBar.open(Err.error.message, 'close');
          this.loading.set(false);
        }
      );
    } else {
      if (!this.data.controls['name'].valid) {
        this.name.nativeElement.focus();
        this.error.set({ ...this.error(), name: 'name is required' });
      }

      if (this.image() === '') {
        this.snackBar.open('image is required', 'close');
      }
    }
  }

  addChange(e: any) {
    if (this.loading()) {
      return;
    }
    const file = e.target.files[0];
    this.photService.add(file, this.image, this.loading);
  }
}
