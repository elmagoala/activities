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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
   
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.userName = auth.displayName;
        this.emailUser = auth.email;
      } else {
        this.isLogin = false;
      }
    }); 
   
  }

  logout() {
    this.authService.logout();
  }

}
