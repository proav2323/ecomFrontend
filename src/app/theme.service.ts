import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: WritableSignal<string> = signal('');
  constructor() {}
}
