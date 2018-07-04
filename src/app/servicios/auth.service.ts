import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthService {

  private authState = null;

  constructor(public afAuth: AngularFireAuth) { 
    this.getAuth().subscribe(auth => {
        this.authState = auth;
    });
   }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData), err => reject(err));
    });
  }

  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData), err => reject(err));
    });
  }

  getAuth() {
    return this.afAuth.authState;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

}
