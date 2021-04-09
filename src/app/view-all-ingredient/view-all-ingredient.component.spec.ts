import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllIngredientComponent } from './view-all-ingredient.component';

describe('ViewAllIngredientComponent', () => {
  let component: ViewAllIngredientComponent;
  let fixture: ComponentFixture<ViewAllIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
