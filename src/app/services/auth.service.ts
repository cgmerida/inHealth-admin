import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSub: Subscription;
  private authUser;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.userSub = this.fireAuth.authState.subscribe(fireUser => {
      if (fireUser)
        this.authUser = fireUser;
    })
  }
  get isAuthenticated(): boolean {
    return !(this.authUser == null || this.authUser == undefined);
  }
  get currentUserId(): string {
    return this.isAuthenticated ? this.authUser.uid : null;
  }

  getAuthUser() {
    return this.isAuthenticated ? this.authUser : null;
  }

  // Login in with email/password
  LogIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.reload();
        this.ngZone.run(async () => {
          this.redirectAuth();
        });
      });
  }


  // Sign-out 
  async SignOut() {
    this.userSub.unsubscribe();
    await this.fireAuth.signOut();

    this.router.navigate(['login']);
  }


  redirectAuth() {
    this.router.navigate(['/dashboard']);
  }

}
