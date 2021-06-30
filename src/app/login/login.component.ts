import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

declare const $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean;

  constructor(

    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }


  async logIn(email, password) {
    if (!email || !password) {
      this.presentAlert('danger', `Ingrese todos los datos`);
      return;
    }
    this.loading = true;

    try {
      await this.authService.LogIn(email, password);
      await this.delay(1000);
    } catch (error) {
      this.presentAlert('danger', `Error inesperado. Error ${error}`);
    }
    this.loading = false;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private presentAlert(type, msg) {
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
