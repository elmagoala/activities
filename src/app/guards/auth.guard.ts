import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../servicios/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router:Router,
              private authService: AuthService) {
  }

  canActivate(): Observable<boolean> | boolean {
    let userAuth = JSON.parse(localStorage.getItem("userFire"));
    if(userAuth) {
        return true;
    }

    this.router.navigate(['login']);
    return false;
}
}
