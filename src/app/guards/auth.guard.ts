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
                console.log(this.authService.authenticated);
  }

  canActivate(): Observable<boolean> | boolean {
    if(this.authService.authenticated) {
        return true;
    }

    return this.authService.currentUserObservable
           .take(1)
           .map(user => !!user)
           .do(loggedIn => {
             if (!loggedIn) {
               console.log("access denied")
               this.router.navigate(['/login']);
             }
         })

    //this.router.navigate(['login']);
    //return false

    /*return this.authService.userLoggedIn.pipe((authenticated) => {
        if(!authenticated) {
            this.router.navigate(['login']);
        }

        return authenticated;
    });*/
}
}
