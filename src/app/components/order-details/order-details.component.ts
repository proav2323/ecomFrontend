import { Component, Inject, WritableSignal, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { orders } from 'src/models/orders';

@Component({
  selector: 'app-order-details',

  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  order: orders | null = null;
  isLoading: WritableSignal<boolean> = signal(false);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private orderService: OrdersService
  ) {
    this.isLoading.set(true);
    const ref = this.orderService.getOrder(this.data.id);
    ref.subscribe((datra) => {
      this.isLoading.set(false);
      this.order = datra as orders;
    });
  }
}
