import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

constructor(private authService: AuthService, private router: Router) { }

  logout(form){
    this.authService.logout();
  }

  changePin(){
    this.router.navigateByUrl('registerpin');
  }
}
