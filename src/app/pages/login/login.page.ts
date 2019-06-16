import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss', '../../../bootstrap/css/bootstrap.min.css'],
})

export class LoginPage implements OnInit {

    private errorMsg: string;
    private pinErrorMsg: string;
    private pinIsSet: boolean;
    returnUrl: string;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.checkPin();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/app/';
    }

    // Fires every time the you enter the view
    ionViewWillEnter() {
        this.checkPin();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/app/';
    }

    // Sets value of pinIsSet which is used in the view
    // To decide if password or pincode should be shown
    checkPin() {
        this.pinIsSet = localStorage.getItem('PIN_CODE_USER') != null;
    }

    login(form: FormGroup) {
        this.authService.login(form.value).subscribe(res => {
            if (res.status !== 200) {
                this.errorMsg = res.error.response;
            } else {
                this.resetForm(form);
                if (localStorage.getItem('PIN_CODE_USER')) {
                    const pinUserName = JSON.parse(localStorage.getItem('PIN_CODE_USER')).username;
                    const currentUserName = JSON.parse(localStorage.getItem('CURRENT_USER')).username;
                    if (pinUserName === currentUserName) {
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
            if (!res) {
                this.pinErrorMsg = 'Pincode incorrect.';
            } else {
                this.router.navigate([this.returnUrl]);
            }
        });
    }

    resetForm(form: FormGroup) {
        this.errorMsg = null;
        this.pinErrorMsg = null;
        form.reset();
    }
}
