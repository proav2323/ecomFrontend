import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartproductcardComponent } from './cartproductcard.component';

describe('CartproductcardComponent', () => {
  let component: CartproductcardComponent;
  let fixture: ComponentFixture<CartproductcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartproductcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartproductcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
