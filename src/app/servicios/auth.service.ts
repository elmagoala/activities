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
  authenticated2: boolean = false;
  userLoggedIn = new Subject<boolean>();
  user: Observable<User>;

  constructor(public afAuth: AngularFireAuth) {
    this.getAuth();  
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
    console.log("currentUser: "+JSON.stringify(this.afAuth.auth.currentUser));
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  /*get authenticated(): boolean {
    this.getAuth().subscribe(auth => {
      this.authState = auth;
      if (this.authState) {
        return true;
      }

  });
  return false;
}*/
// Returns true if user is logged in
get authenticated(): boolean {
  console.log("service: "+JSON.stringify(this.getAuth()));
  if (this.getAuth() !== null) {
    return true;
  }
  return false;
}

get currentUserObservable(): any {
  return this.afAuth.auth;
}

  checkAuthStatus() {
    firebase.auth().onAuthStateChanged((user) => {
        this.authenticated2 = !!user;
        this.userLoggedIn.next(this.authenticated);
    });
}

}
