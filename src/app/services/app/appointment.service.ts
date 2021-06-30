import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Appointment } from 'app/models/appointment';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentCollection: AngularFirestoreCollection<Appointment>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,) {

    this.appointmentCollection = this.db.collection<Appointment>('appointments');
  }

  getAppointments() {
    return this.appointmentCollection.valueChanges({ idField: 'uid' });
  }

  getAppointmentsByUser(): Observable<Appointment[]> {
    let userUid: User["uid"] = this.authService.currentUserId;
    return this.db.collection<Appointment>('appointments', ref => {
      return ref.where('owner', '==', userUid)
        .orderBy('date', 'desc');
    })
      .valueChanges({ idField: 'uid' });
  }

  updateAppointment(appointment) {
    appointment.updatedAt = new Date();
    return this.appointmentCollection.doc(appointment.uid).update(appointment)
      .then(() => {
        return `Cita actualizada`;
      })
      .catch(err => {
        return `Error: ${err}`;
      });
  }

  deleteAppointment(uid: Appointment['uid']) {
    return this.appointmentCollection.doc(uid).delete()
      .then(() => {
        return `Cita eliminada`;
      })
      .catch(err => {
        return `Error: ${err}`;
      });
  }
}
