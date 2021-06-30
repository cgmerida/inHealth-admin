import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ClinicsComponent } from 'app/pages/clinics/clinics.component';
import { ClinicFormComponent } from 'app/forms/clinic-form/clinic-form.component';
import { AppointmentsComponent } from 'app/pages/appointments/appointments.component';
import { AppointmentTrackComponent } from 'app/forms/appointment-track/appointment-track.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'clinics', component: ClinicsComponent },
    { path: 'clinics/create', component: ClinicFormComponent },
    { path: 'clinics/edit', component: ClinicFormComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'appointments/track', component: AppointmentTrackComponent },
    // { path: 'appointments/create', component: ClinicFormComponent },
    // { path: 'appointments/edit', component: ClinicFormComponent },
];
