import { Component, OnInit, forwardRef, NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpin',
  templateUrl: './registerpin.page.html',
  styleUrls: ['./registerpin.page.scss']
})

export class RegisterPinPage {

  private pinErrorMsg: string;

  constructor(private router: Router) { }

  registerPin(form) {
	let pin: number;
	let repeat_pin:number;
	pin = parseInt(form.value.pincode);
	repeat_pin = parseInt(form.value.repeat_pincode);

	if (isNaN(pin) && isNaN(repeat_pin)) {
		this.pinErrorMsg = 'U kunt alleen cijfers in uw pincode gebruiken.';
	} else {
		//check the length of the PIN
		if ((pin.toString().length < 5 || pin.toString().length > 8) && (repeat_pin.toString().length < 5 || repeat_pin.toString().length > 8)) {
			this.pinErrorMsg = 'Uw pincode mag niet minder dan 5 en niet meer dan 8 cijfers bevatten.';

		//check if the first pin equals the confirm pin
		} else if (pin != repeat_pin){
			this.pinErrorMsg = 'Uw bevestigingspincode moet hetzelfde zijn.';
		}	else {
			const username = JSON.parse(localStorage.getItem('CURRENT_USER')).username;
			const pinuser = { username: username, pin: pin };
			localStorage.setItem('PIN_CODE_USER', JSON.stringify(pinuser));
			console.log("TEST: " + JSON.stringify(pinuser));
			this.router.navigateByUrl('');
		}
	}
	form.reset();
  }

}
