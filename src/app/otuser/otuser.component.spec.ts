import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTUserComponent } from './otuser.component';

describe('OTUserComponent', () => {
  let component: OTUserComponent;
  let fixture: ComponentFixture<OTUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OTUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OTUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
