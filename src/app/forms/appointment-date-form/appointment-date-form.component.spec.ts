import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDateFormComponent } from './appointment-date-form.component';

describe('AppointmentDateFormComponent', () => {
  let component: AppointmentDateFormComponent;
  let fixture: ComponentFixture<AppointmentDateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
