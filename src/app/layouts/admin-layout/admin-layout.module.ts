import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


//Routes
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ClinicFormComponent } from 'app/forms/clinic-form/clinic-form.component';
import { ClinicsComponent } from 'app/pages/clinics/clinics.component';
import { AppointmentsComponent } from 'app/pages/appointments/appointments.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppointmentDateFormComponent } from 'app/forms/appointment-date-form/appointment-date-form.component';
import { AppointmentTrackComponent } from 'app/forms/appointment-track/appointment-track.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    // Date Picker
    // MatDatepickerModule, 
    MatNativeDateModule,
    // MatMomentDateModule
  ],
  declarations: [
    DashboardComponent,
    ClinicsComponent,
    AppointmentsComponent,
    ClinicFormComponent,
    AppointmentDateFormComponent,
    AppointmentTrackComponent,
  ],


  entryComponents: [
    AppointmentDateFormComponent
  ],
})

export class AdminLayoutModule { }
