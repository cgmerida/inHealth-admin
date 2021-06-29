import { Component, OnInit } from '@angular/core';
import { Clinic } from 'app/models/clinic';
import { ClinicService } from 'app/services/app/clinic.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicsComponent implements OnInit {

  clinics: Observable<Clinic[]>;

  constructor(
    private appointmentService: ClinicService,
  ) { }

  ngOnInit() {
    this.clinics = this.appointmentService.getClinics();
  }


}
