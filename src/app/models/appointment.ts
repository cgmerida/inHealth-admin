
import { Clinic } from './clinic';
import { User } from './user';
import { firestore } from 'firebase';

import Timestamp = firestore.Timestamp;

export const enum status_enum {
  "Agendada" = "Agendada",
  "Reagendada" = "Reagendada",
  "Esperando resultados" = "Esperando resultados",
  "Completada" = "Completada",
  "Cancelada" = "Cancelada"
}

export interface Appointment {
  uid?: string;
  clinic: Partial<Clinic>;
  specialty: Clinic["specialties"][0];
  date: Timestamp;
  status: status_enum;
  exams: Exam[];
  owner: User["uid"];
  doneAt?: Timestamp | Date;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;

}

interface Exam {
  name: string;
  price: number
  url: string;
}