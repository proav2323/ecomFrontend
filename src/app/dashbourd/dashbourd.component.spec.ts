import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbourdComponent } from './dashbourd.component';

describe('DashbourdComponent', () => {
  let component: DashbourdComponent;
  let fixture: ComponentFixture<DashbourdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbourdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbourdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
