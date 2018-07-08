import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.authService.loginEmail(this.email, this.password).then((res) => {
      this.flashMessage.show("Usuario logeado correctamente", {
        cssClass:'alert-success', timeout: 4000
      });
      localStorage.setItem("userFire",JSON.stringify(res));
      this.router.navigate(['/privado']);
    }).catch((err) => {
      this.flashMessage.show(err.message, {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['/login']);
    });
  }

}
