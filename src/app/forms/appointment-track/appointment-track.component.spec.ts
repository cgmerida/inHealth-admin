import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTrackComponent } from './appointment-track.component';

describe('AppointmentTrackComponent', () => {
  let component: AppointmentTrackComponent;
  let fixture: ComponentFixture<AppointmentTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
