import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClinicService } from 'app/services/app/clinic.service';

declare const $: any;

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.css']
})
export class ClinicFormComponent implements OnInit {

  clinicForm: FormGroup;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private clinicService: ClinicService,
  ) { }

  ngOnInit(): void {
    this.clinicForm = this.formBuilder.group({
      name: [null, Validators.required],
      dir: [null, Validators.required],
      tel: [null, [Validators.pattern('^[0-9]{8}$')]],
      schedule: [null, Validators.required],
      specialties: this.formBuilder.array([])
    });
  }

  get specialties(): FormArray {
    return this.clinicForm.get("specialties") as FormArray
  }

  onSubmit() {
    if (!this.clinicForm.valid) {
      return false;
    }

    this.register();
  }

  async register() {
    this.loading = true;
    let clinic = this.clinicForm.value;

    try {
      let resp = await this.clinicService.addClinic(clinic);
      this.presentAlert('success', resp);
    } catch (err) {
      this.presentAlert('danger', err);
    } finally {
      this.loading = false;
    }

  }

  addSpecialty() {
    this.specialties.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      doc: new FormControl(null, Validators.required),
    }));
  }


  removeSpecialty(i: number) {
    this.specialties.removeAt(i);
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
