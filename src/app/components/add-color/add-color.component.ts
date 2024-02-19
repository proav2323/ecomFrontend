import { Colors } from './../../../models/colors';
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

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.css',
})
export class AddColorComponent {
  loading: WritableSignal<boolean> = signal(false);
  error: WritableSignal<{ name: string; color: string }> = signal({
    name: '',
    color: '',
  });
  theme: string = '';
  @ViewChild('name') name!: ElementRef<HTMLInputElement>;
  @ViewChild('color') color!: ElementRef<HTMLInputElement>;
  constructor(
    private colorS: ColorService,
    private ref: MatDialogRef<AddColorComponent>,
    private snackBar: MatSnackBar,
    private ThemeS: ThemeService,
    @Inject(MAT_DIALOG_DATA) public dataa: { isEditing: boolean; color: Colors }
  ) {
    effect(() => {
      this.theme = this.ThemeS.theme();
    });

    this.data.valueChanges.subscribe(() => {
      console.log(this.data.controls['color'].value);
    });
  }

  data: FormGroup = new FormGroup({
    name: new FormControl(this.dataa.isEditing ? this.dataa.color.name : '', [
      Validators.required,
    ]),
    color: new FormControl(this.dataa.isEditing ? this.dataa.color.color : '', [
      Validators.required,
    ]),
  });

  add() {
    this.error.set({ name: '', color: '' });
    if (this.data.valid) {
      this.loading.set(true);
      const ref = this.colorS.add(
        this.data.controls['name'].value!,
        this.data.controls['color'].value!
      );

      ref.subscribe(
        () => {
          this.colorS.getAll();
          this.ref.close();
          this.snackBar.open('color added', 'close');
          this.loading.set(false);
        },
        (Err) => {
          this.snackBar.open(Err.error.message, 'close');
          this.loading.set(false);
        }
      );
    } else {
      if (!this.data.controls['color'].valid) {
        this.color.nativeElement.focus();
        this.error.set({ ...this.error(), color: 'color is required' });
      }

      if (!this.data.controls['name'].valid) {
        this.name.nativeElement.focus();
        this.error.set({ ...this.error(), name: 'name is required' });
      }
    }
  }

  edit() {
    this.error.set({ name: '', color: '' });
    if (this.data.valid) {
      this.loading.set(true);
      const ref = this.colorS.update(
        this.data.controls['name'].value!,
        this.data.controls['color'].value!,
        this.dataa.color.id
      );

      ref.subscribe(
        () => {
          this.colorS.getAll();
          this.ref.close();
          this.snackBar.open('color edited', 'close');
          this.loading.set(false);
        },
        (Err) => {
          this.snackBar.open(Err.error.message, 'close');
          this.loading.set(false);
        }
      );
    } else {
      if (!this.data.controls['color'].valid) {
        this.color.nativeElement.focus();
        this.error.set({ ...this.error(), color: 'color is required' });
      }

      if (!this.data.controls['name'].valid) {
        this.name.nativeElement.focus();
        this.error.set({ ...this.error(), name: 'name is required' });
      }
    }
  }
}
