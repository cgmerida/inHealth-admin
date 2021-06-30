import { Component, OnInit } from '@angular/core';
import { Appointment, status_enum } from 'app/models/appointment';
import { AppointmentService } from 'app/services/app/appointment.service';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDateFormComponent } from 'app/forms/appointment-date-form/appointment-date-form.component';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointments: Observable<Appointment[]>;
  loading: boolean;

  statusColor = { "Agendada": "text-primary", "Reagendada": "text-info", "Esperando resultados": "text-warning", "Completada": "text-success", "Cancelada": "text-danger" };

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appointments = this.appointmentService.getAppointments()
      .pipe(
        map((appointments) => {
          return appointments.map(a => {
            return {
              ...a,
              user: this.userService.getUser(a.owner),
            };
          })
        })
      );
  }

  changeDate(a: Appointment): void {
    const dialogRef = this.dialog.open(AppointmentDateFormComponent, {
      width: '40vw',
      // data: { appointment: a }
    });

    dialogRef.afterClosed().subscribe(async newDate => {

      let updatedApp = { uid: a.uid, status: status_enum.Reagendada, date: new Date(newDate) }

      try {
        let resp = await this.appointmentService.updateAppointment(updatedApp);
        this.presentAlert('success', `Cita Reagendada. ${resp}`);
      } catch (err) {
        this.presentAlert('danger', err);
      } finally {
        this.loading = false;
      }
    });
  }


  trackAppointment(ap) {
    delete ap.user;
    this.router.navigate(['/appointments/track'], { state: { data: ap } });
  }


  async cancelAppointment(appUid) {
    this.loading = true;

    try {
      let resp = await this.appointmentService.updateAppointment({ uid: appUid, status: status_enum.Cancelada });
      this.presentAlert('success', `Cita Cancelada. ${resp}`);
    } catch (err) {
      this.presentAlert('danger', err);
    } finally {
      this.loading = false;
    }
  }

  getColor(status) {

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


  trackId(i, a: Appointment) { return a.uid; }

}
