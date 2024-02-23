import {
  Component,
  Inject,
  Signal,
  ViewChild,
  WritableSignal,
  effect,
  signal,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  isLoading: WritableSignal<boolean> = signal(false);
  loading: boolean = false;
  error: WritableSignal<{ email: string; password: string; name: string }> =
    signal({
      email: '',
      password: '',
      name: '',
    });

  @ViewChild('email') email!: ElementRef<HTMLInputElement>;
  @ViewChild('password') password!: ElementRef<HTMLInputElement>;
  @ViewChild('name') name!: ElementRef<HTMLInputElement>;
  constructor(
    private authService: AuthService,
    private ref: MatDialogRef<SignUpComponent>,
    private snackbar: MatSnackBar,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataa: { isEditing: boolean }
  ) {
    effect(() => {
      this.loading = this.isLoading();
    });
  }

  openLogin() {
    this.ref.close();
    if (window.innerWidth > 760) {
      this.matDialog.open(LoginComponent, {
        width: '30%',
      });
    } else {
      this.matDialog.open(LoginComponent, {
        width: '100%',
      });
    }
  }

  data: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false),
  });

  login() {
    this.error.set({ email: '', password: '', name: '' });
    if (this.data.valid) {
      if (
        this.dataa !== null &&
        this.dataa.isEditing === true &&
        (this.data.controls['isAdmin'].value === undefined ||
          this.data.controls['isAdmin'].value === null)
      ) {
        this.snackbar.open('is Admin is required', 'close');
        return;
      }
      this.isLoading.set(true);
      this.data.disable();
      const ref = this.authService.signUp(
        this.data.controls['email'].value!,
        this.data.controls['password'].value!,
        this.data.controls['name'].value!,
        this.dataa !== null && this.dataa.isEditing
          ? this.data.controls['isAdmin'].value === true
            ? 'ADMIN'
            : 'USER'
          : this.data.controls['email'].value === 'anshvishesh03@gmail.com'
          ? 'ADMIN'
          : 'USER'
      );
      if (
        this.dataa === null ||
        this.dataa.isEditing === false ||
        this.dataa.isEditing === undefined ||
        this.dataa.isEditing === null
      ) {
        ref.subscribe(
          (value: any) => {
            localStorage.setItem('token', value.token);
            console.log('anhs is good');
            this.isLoading.set(false);
            this.data.enable();
            this.ref.close();
            const val = this.authService.decodeToken(value.token as string);
            val.subscribe((va: any) => {
              this.authService.getUser(va['id']);
              this.snackbar.open('register successfull', 'close');
            });
          },
          (err) => {
            console.log(err);
            this.isLoading.set(false);
            this.data.enable();
            this.snackbar.open(err.error.message, 'close');
          }
        );
      } else {
        ref.subscribe(
          (value: any) => {
            this.isLoading.set(false);
            this.data.enable();
            this.ref.close();
            const val = this.authService.decodeToken(value.token as string);
            val.subscribe((va: any) => {
              this.authService.getAll();
              this.snackbar.open('update sucessfull', 'close');
            });
          },
          (err) => {
            console.log(err);
            this.isLoading.set(false);
            this.data.enable();
            this.snackbar.open(err.error.message, 'close');
          }
        );
      }
    } else {
      if (this.data.controls['email'].errors) {
        console.log(this.email);
        this.email.nativeElement.focus();
        if (this.data.controls['email'].hasError('email')) {
          this.error.set({ ...this.error(), email: 'email is not valid' });
        } else if (this.data.controls['email'].hasError('required')) {
          this.error.set({ ...this.error(), email: 'email is required' });
        }
      }

      if (this.data.controls['password'].errors) {
        this.password.nativeElement.focus();
        if (this.data.controls['password'].hasError('required')) {
          this.error.set({ ...this.error(), password: 'password is required' });
        }
      }
      if (this.data.controls['name'].errors) {
        this.name.nativeElement.focus();
        if (this.data.controls['name'].hasError('required')) {
          this.error.set({
            ...this.error(),
            name: 'name is required',
          });
        }
      }
    }
  }
}
