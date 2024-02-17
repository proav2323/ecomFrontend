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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading: WritableSignal<boolean> = signal(false);
  loading: boolean = false;
  error: WritableSignal<{ email: string; password: string }> = signal({
    email: '',
    password: '',
  });

  @ViewChild('email') email!: ElementRef<HTMLInputElement>;
  @ViewChild('password') password!: ElementRef<HTMLInputElement>;
  constructor(
    private authService: AuthService,
    private ref: MatDialogRef<LoginComponent>,
    private snackbar: MatSnackBar
  ) {
    effect(() => {
      this.loading = this.isLoading();
    });
  }

  data: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.error.set({ email: '', password: '' });
    if (this.data.valid) {
      this.isLoading.set(true);
      this.data.disable();
      const ref = this.authService.login(
        this.data.controls['email'].value!,
        this.data.controls['password'].value!
      );

      ref.subscribe(
        (value) => {
          localStorage.setItem('token', JSON.stringify(value));
          this.isLoading.set(false);
          this.data.enable();
          this.ref.close();
          this.snackbar.open('login successfull', 'close');
        },
        (err) => {
          console.log(err);
          this.isLoading.set(false);
          this.data.enable();
          this.snackbar.open(err.error.message, 'close');
        }
      );
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
    }
  }
}
