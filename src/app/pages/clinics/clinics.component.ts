import { Component, OnInit } from '@angular/core';
import { Clinic } from 'app/models/clinic';
import { ClinicService } from 'app/services/app/clinic.service';
import { Observable } from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicsComponent implements OnInit {

  clinics: Observable<Clinic[]>;
  loading: boolean;

  constructor(
    private clinicService: ClinicService,
  ) { }

  ngOnInit() {
    this.clinics = this.clinicService.getClinics();
  }

  async deleteClinic(clinicUid) {
    this.loading = true;

    try {
      let resp = await this.clinicService.deleteClinic(clinicUid);
      this.presentAlert('success', resp);
    } catch (err) {
      this.presentAlert('danger', err);
    } finally {
      this.loading = false;
    }


  }

  presentAlert(type, msg) {
    $.notify({
      message: msg
    }, {
      type: type,
      timer: 2000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }


}
