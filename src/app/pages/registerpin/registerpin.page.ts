import {Component} from '@angular/core';
import {Router} from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
    selector: 'app-registerpin',
    templateUrl: './registerpin.page.html',
    styleUrls: ['./registerpin.page.scss']
})

export class RegisterPinPage {

    private pinErrorMsg: string;
    trigger = '';
    regexp = new RegExp('0{4}|1{4}|2{4}|3{4}|4{4}|5{4}|6{4}|7{4}|8{4}|9{4}');

    constructor(private router: Router) {}

    registerPin(form) {
        let pin: number;
        let repeat_pin: number;
        pin = parseInt(form.value.pincode, 10);
        repeat_pin = parseInt(form.value.repeat_pincode, 10);
        const regex = this.regexp.test(JSON.stringify(pin));

        if (isNaN(pin) && isNaN(repeat_pin)) {
            this.pinErrorMsg = 'U kunt alleen cijfers in uw pincode gebruiken.';
        } else {
            // check the length of the PIN
            if ((pin.toString().length < 5 || pin.toString().length > 8)
                && (repeat_pin.toString().length < 5 || repeat_pin.toString().length > 8)) {
                this.pinErrorMsg = 'Uw pincode mag niet minder dan 5 en niet meer dan 8 cijfers bevatten.';

                // checks if there are consecutive digits in the PIN (max 3 allowed)
            } else if (regex) {
                this.pinErrorMsg = 'Uw pincode mag niet meer dan 3 herhalende cijfers bevatten.';

                // check if the first pin equals the confirm PIN
            } else if (pin !== repeat_pin) {
                this.pinErrorMsg = 'Uw bevestigingspincode moet hetzelfde zijn.';
            } else {
                const username = JSON.parse(localStorage.getItem('CURRENT_USER')).username;
                const saltRounds = 10;
                const myHashedPincode = JSON.stringify(pin);

                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(myHashedPincode, salt, function (error, hash) {
                        const pinuser = {username: username, pin: hash};
                        localStorage.setItem('PIN_CODE_USER', JSON.stringify(pinuser));
                    });
                });
                this.router.navigateByUrl('');
            }
        }
        form.reset();
    }
}
