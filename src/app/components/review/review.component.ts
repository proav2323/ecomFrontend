import { Component, Inject, WritableSignal, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Reviews } from 'src/models/reviews';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  review: WritableSignal<Reviews | null> = signal(null);
  constructor(
    private reviewService: ReviewsService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    const ref = this.reviewService.getOne(this.data.id);
    ref.subscribe((data) => {
      this.review.set(data as Reviews);
    });
  }
}
