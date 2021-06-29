import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ClinicsComponent } from 'app/pages/clinics/clinics.component';
import { ClinicFormComponent } from 'app/forms/clinic-form/clinic-form.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'clinics', component: ClinicsComponent },
    { path: 'clinics/create', component: ClinicFormComponent },
    { path: 'clinics/edit', component: ClinicFormComponent },
];
