import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService, User } from 'src/app/core/auth';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
		const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
		return (invalidCtrl || invalidParent);
	}
}
@Component({
  selector: 'kt-profile-password-change',
  templateUrl: './profile-password-change.component.html',
  styleUrls: ['./profile-password-change.component.scss']
})
export class ProfilePasswordChangeComponent {

  passwordform: FormGroup; 
  user:User;
  hide = true;
	hide1 = true;
	matcher = new MyErrorStateMatcher();
  constructor(fb: FormBuilder,private authService: AuthService,
    private layoutUtilsService: LayoutUtilsService,){
    this.passwordform = fb.group({
      
			password: ['', [Validators.required]],
			confirmPassword: [''],
		}, { validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
		const pass = group.controls.password.value;
		const confirmPass = group.controls.confirmPassword.value;

		return pass === confirmPass ? null : { notSame: true }
	}
  passwordChange(){
    debugger;
  const _user: any = new User();
  const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
  _user.id = authInfo.userInfo.id;
  _user.password = this.passwordform.controls.password.value;
  this.authService.passwordupdate(_user).subscribe(
    results => {
      if (!results) {
        console.log('password not updated');
      }
      const message = `password successfully has been updated.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
      //   this.router.navigate(['../user-management/users']);
    }
  )
}
}
