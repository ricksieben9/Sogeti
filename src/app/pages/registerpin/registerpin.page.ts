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
	pin = parseInt(form.value.pincode);
	if (isNaN(pin)) {
		this.pinErrorMsg = 'U kunt alleen cijfers in uw pincode gebruiken.';
	} else {
		if (pin.toString().length < 5 || pin.toString().length > 8) {
		this.pinErrorMsg = 'Uw pincode mag niet minder dan 5 en niet meer dan 8 cijfers bevatten.';
		} else {
		const username = JSON.parse(localStorage.getItem('CURRENT_USER')).username;
		const pinuser = { username: username, pin: pin };
		localStorage.setItem('PIN_CODE_USER', JSON.stringify(pinuser));
		this.router.navigateByUrl('');
		}
	}
	form.reset();
  }

}