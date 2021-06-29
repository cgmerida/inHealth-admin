import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { ErrorService } from './error.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private errors: ErrorService,
    private db: AngularFirestore,
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

  // Register user with email/password
  async RegisterUser(userData) {
    let authUser = (await this.fireAuth.createUserWithEmailAndPassword(userData.email, userData.password)).user;

    delete userData.password;
    delete userData.confirmpassword;

    let user: User = {
      uid: authUser.uid,
      emailVerified: authUser.emailVerified,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.db.collection<User>('users').doc(user.uid).set(user);
    await this.SendVerificationMail();

  }


  // Email verification when new user register
  SendVerificationMail() {
    return this.fireAuth.currentUser
      .then(user => {
        return user.sendEmailVerification();
      })
      .catch((err) => {
      });
  }

  // Recover password
  async PasswordRecover(email) {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);
    } catch (err) {
    }
  }

  // Login in with email/password
  LogIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.reload();
        this.ngZone.run(async () => {
          this.redirectAuth();
        });
      }).catch((err) => {
      })
  }


  // Sign-out 
  async SignOut() {
    this.userSub.unsubscribe();
    await this.fireAuth.signOut();

    this.router.navigate(['login']);
  }


  redirectAuth() {
    this.router.navigate(['/app/inicio']);
  }

}
