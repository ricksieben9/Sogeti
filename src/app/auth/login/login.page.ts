import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../../../bootstrap/css/bootstrap.min.css'],
})

export class LoginPage implements OnInit {

  private errorMsg: string;
  private pinErrorMsg: string;
  private pinIsSet: boolean;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.pinIsSet = localStorage.getItem("PIN_CODE_USER") != null;
    this.errorMsg = null;
    this.pinErrorMsg = null;

  }

  login(form: FormGroup) {
    this.authService.login(form.value).subscribe(res => {
      if (res.status != 200) {
        this.errorMsg = res.error.response;
      } else {
        form.reset();
        if (localStorage.getItem("PIN_CODE_USER")) {
          const pinUserName = JSON.parse(localStorage.getItem("PIN_CODE_USER")).username;
          const currentUserName = JSON.parse(localStorage.getItem("CURRENT_USER")).username;
          if (pinUserName == currentUserName) {
            this.router.navigateByUrl('');
          } else {
            this.router.navigateByUrl('registerpin');
          }
        } else {
          this.router.navigateByUrl('registerpin');
        }
      }
    });
  }

  pinLogin(form: FormGroup) {
    this.authService.pinLogin(form.value.pincode).subscribe(res => {
      if (res.status != 200) {
        this.pinErrorMsg = res.error.response;
      } else {
        form.reset();
        this.router.navigateByUrl('');
      }
    });
  }
}
