import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllMealsComponent } from './view-all-meals.component';

describe('ViewAllMealsComponent', () => {
  let component: ViewAllMealsComponent;
  let fixture: ComponentFixture<ViewAllMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllMealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
