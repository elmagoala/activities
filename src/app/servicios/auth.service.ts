import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  private authState: any = null;

  constructor(public afAuth: AngularFireAuth) { }

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

   // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }


  getAuth() {
    this.afAuth.authState
    .subscribe(res => {
      if (res && res.uid) {
        return res;
        //console.log(JSON.stringify(res)+' user is logged in');
      } else {
        //console.log(JSON.stringify(res)+ 'user not logged in');
      }
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
