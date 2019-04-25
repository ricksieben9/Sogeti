import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab4',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage {

    constructor(private authService: AuthService, private router: Router) {
    }

    logout() {
        this.authService.logout();
    }

    changePin() {
        this.router.navigateByUrl('registerpin');
    }
}
