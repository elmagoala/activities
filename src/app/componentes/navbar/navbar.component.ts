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
    this.isLogin = this.authService.authenticated;
    console.log("user:" + this.authService.currentUser);
  }

  logout() {
    this.authService.logout();
  }

}
