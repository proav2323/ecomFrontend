import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { Product } from 'src/models/products';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CarouselComponent {
  @Input() products!: Product[];
  theme: string = '';
  int!: any;
  constructor(private themeS: ThemeService, private router: Router) {
    this.theme = this.themeS.theme();
    this.int = setInterval(() => {
      if (this.currentSlide === this.products.length - 1) {
        this.currentSlide = 0;
      } else {
        this.currentSlide += 1;
      }
    }, 10000);
  }
  currentSlide = 0;

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.products.length - 1 : previous;
    console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.products.length ? 0 : next;
    console.log('next clicked, new current slide is: ', this.currentSlide);
  }

  set(ind: number) {
    this.currentSlide = ind;
    clearInterval(this.int);
    setTimeout(() => {
      this.int = setInterval(() => {
        if (this.currentSlide === this.products.length - 1) {
          this.currentSlide = 0;
        } else {
          this.currentSlide += 1;
        }
      }, 10000);
    }, 2000);
  }
  stop() {
    clearInterval(this.int);
  }

  start() {
    clearInterval(this.int);
    this.int = setInterval(() => {
      if (this.currentSlide === this.products.length - 1) {
        this.currentSlide = 0;
      } else {
        this.currentSlide += 1;
      }
    }, 10000);
  }

  route(category: string) {
    this.router.navigate(['/products'], {
      queryParams: { category: category },
    });
  }
}
