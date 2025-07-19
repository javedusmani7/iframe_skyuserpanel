import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetPlaceCompComponent } from './bet-place-comp.component';

describe('BetPlaceCompComponent', () => {
  let component: BetPlaceCompComponent;
  let fixture: ComponentFixture<BetPlaceCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetPlaceCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetPlaceCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
