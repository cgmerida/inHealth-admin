import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clinic } from 'app/models/clinic';
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
  updating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private clinicService: ClinicService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let data: Clinic = history.state.data;

    this.clinicForm = this.formBuilder.group({
      uid: [data ? data.uid : null],
      name: [data ? data.name : null, Validators.required],
      dir: [data ? data.dir : null, Validators.required],
      tel: [data ? data.tel : null, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      schedule: [data ? data.schedule : null, Validators.required],
      specialties: this.formBuilder.array([])
    });

    if (data) {
      this.createSpecialties(data.specialties);
      this.updating = true;
    }
  }

  get specialties(): FormArray {
    return this.clinicForm.get("specialties") as FormArray
  }

  onSubmit() {
    if (this.clinicForm.invalid || this.clinicForm.get("specialties").value.length === 0) {
      this.presentAlert('danger', `<strong>Error -</strong> formulario incorrecto`);
      return;
    }

    if (this.updating)
      this.update();
    else
      this.register();
  }

  async register() {
    this.loading = true;
    let clinic = this.clinicForm.value;

    delete clinic.uid;
    try {
      let resp = await this.clinicService.addClinic(clinic);
      this.presentAlert('success', resp);
      this.resetForm();
    } catch (err) {
      this.presentAlert('danger', err);
    } finally {
      this.loading = false;
    }

  }

  async update() {
    this.loading = true;
    let clinic = this.clinicForm.value;

    console.log(clinic);
    try {
      let resp = await this.clinicService.updateClinic(clinic);
      this.presentAlert('success', resp);
      this.resetForm();
    } catch (err) {
      this.presentAlert('danger', err);
    } finally {
      this.loading = false;
    }

  }

  resetForm() {
    this.router.navigate(['/clinics']);
  }

  createSpecialties(specialties: Clinic["specialties"]) {
    specialties.forEach(s => {
      this.addSpecialty(s);
    });
  }

  addSpecialty(specialty?: Clinic["specialties"][0]) {
    this.specialties.push(new FormGroup({
      name: new FormControl(specialty ? specialty.name : null, Validators.required),
      doc: new FormControl(specialty ? specialty.doc : null, Validators.required),
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
