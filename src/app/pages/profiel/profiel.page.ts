import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab4',
    templateUrl: 'profiel.page.html',
    styleUrls: ['profiel.page.scss']
})
export class ProfielPage {

    constructor(private authService: AuthService, private router: Router) {
    }

    logout() {
        this.authService.logout();
    }

    changePin() {
        this.router.navigateByUrl('registerpin');
    }
}
