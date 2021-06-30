
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'app/models/appointment';
import { User } from 'app/models/user';
import { AppointmentService } from 'app/services/app/appointment.service';
import { StorageService } from 'app/services/storage.service';
import { UserService } from 'app/services/user.service';

declare const $: any;

@Component({
  selector: 'app-appointment-track',
  templateUrl: './appointment-track.component.html',
  styleUrls: ['./appointment-track.component.css'],
  providers: [DatePipe]
})
export class AppointmentTrackComponent implements OnInit {
  appointment: Appointment;
  appointmentForm: FormGroup;
  user: User;
  loading: boolean;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private elRef: ElementRef,
    private storageService: StorageService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.appointment = history.state.data;
    if (!this.appointment) {
      this.router.navigate(['/appointments']);
      return;
    }

    this.userService.getUser(this.appointment.owner).subscribe(u => {
      this.user = u;
    });

    this.appointmentForm = this.formBuilder.group({
      status: [this.appointment.status, Validators.required],
      exams: this.formBuilder.array([])
    });

    if (!this.appointment.exams)
      this.appointment.exams = [];

    this.createExams(this.appointment.exams);
  }


  get exams(): FormArray {
    return this.appointmentForm.get("exams") as FormArray
  }



  onSubmit() {
    if (!this.appointmentForm.valid) {
      return false;
    }
    this.registrar();
  }

  async registrar() {
    this.loading = true;
    let appointment = this.appointmentForm.value;
    appointment.uid = this.appointment.uid;

    try {
      let res = await this.appointmentService.updateAppointment(appointment);
      this.presentAlert('success', `<strong>¡Genial!</strong> - ${res}`);
    } catch (error) {
      this.presentAlert('danger', `<strong>Error!</strong> - Problema creando el recurso. Error: ${error}`);
    } finally {
      this.loading = false;
    }
  }


  createExams(exams: Appointment["exams"]) {
    exams.forEach(s => {
      this.addExam(s);
    });
  }

  addExam(exam: Appointment["exams"][0]) {
    this.exams.push(new FormGroup({
      name: new FormControl(exam ? exam.name : null, Validators.required),
      price: new FormControl(exam ? exam.price : null),
      url: new FormControl(exam ? exam.url : null, Validators.required),
    }));
  }


  async onFileChoose(event: Event, i) {
    this.loading = true;
    let actualExam = this.appointmentForm.get("exams")[i].value;

    if (!actualExam.name) {
      this.presentAlert('danger', `<strong>Error</strong> - Se debe definir el nombre del archivo`);
      this.loading = false;
      return;
    }

    if (actualExam.url) {
      this.presentAlert('danger', `<strong>Error</strong> - Se debe eliminar el archivo subido anteriormente`);
      this.loading = false;
      return;
    }

    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /(image\/jpg|image\/jpeg|image\/png|application\/pdf|application\/msword)/;
    let ext = this.getExt(file.name);

    if (!file.type.match(pattern) && this.checkExt(ext)) {
      this.presentAlert('danger', `<strong>Error al subir archivo</strong> - Tipo de archivo ${file.type} no valido. extension: ${ext}`);
      this.loading = false;
      return;
    }

    let imgUrl = await this.getImg(actualExam.name, ext, file);
    if (!imgUrl) {
      this.loading = false;
      return;
    }

    this.appointmentForm.get("exams")[i].get('url').setValue(imgUrl);
    this.presentAlert('success', `Se registro el archivo correctamente`);
    this.loading = false;
  }


  openFile(i) {
    let element = this.elRef.nativeElement.querySelectorAll(`#filepicker${i}`)[0];
    element.click();
  }


  async removeExam(i: number) {
    this.loading = true;
    let url = this.appointmentForm.get("exams")[i].get('url').value;

    if (url) {
      try {
        let resp = await this.storageService.deleteRecord(url);
        this.presentAlert('success', resp);
      } catch (err) {
        this.presentAlert('danger', `Error eliminando archivo: ${err}`);
      }
    }
    this.exams.removeAt(i);
    this.loading = false;
  }


  async getImg(name, ext, file) {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let filename = `${name}_${date}.${ext}`;
    let uid = this.user.uid;

    try {
      return await this.storageService.uploadRecord('exams', uid, filename, file);
    } catch (err) {
      this.presentAlert('danger', `Error subiendo archivo: ${err.code}`);
      return;
    }

  }

  private getExt(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1].toLowerCase();
  }

  private checkExt(ext) {
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'pdf':
      case 'doc':
      case 'docs':
        return true;
    }
    return false;

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
