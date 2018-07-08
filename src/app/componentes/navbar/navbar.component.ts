import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLogin: boolean;
  public userName: string;
  public emailUser: string;
  public photoUser: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
   
    this.authService.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.userName = auth.displayName;
        this.emailUser = auth.email;
        this.photoUser = auth.photoURL;
      } else {
        this.isLogin = false;
      }
    }); 
   
  }

  logout() {
    this.authService.logout();
  }

}
