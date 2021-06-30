import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-appointment-date-form',
  templateUrl: './appointment-date-form.component.html',
  styleUrls: ['./appointment-date-form.component.css']
})
export class AppointmentDateFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AppointmentDateFormComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: Clinic
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
