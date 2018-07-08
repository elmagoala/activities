import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of, Subject } from 'rxjs';
import { switchMap} from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class AuthService {

  private authState = null;
  
  constructor(public afAuth: AngularFireAuth) {
    
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

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider); 
  }

  
  logout() {
    localStorage.removeItem("userFire");
    return this.afAuth.auth.signOut();
    
  }

}
