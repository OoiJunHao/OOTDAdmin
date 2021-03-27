import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewMealComponent } from './create-new-meal.component';

describe('CreateNewMealComponent', () => {
  let component: CreateNewMealComponent;
  let fixture: ComponentFixture<CreateNewMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
