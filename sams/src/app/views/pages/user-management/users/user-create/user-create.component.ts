import { Component, OnInit } from '@angular/core';
import { User, AuthService, selectUsersActionLoading, selectUserById } from 'src/app/core/auth';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubheaderService, LayoutConfigService } from 'src/app/core/_base/layout';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
		const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
		return (invalidCtrl || invalidParent);
	}
}
@Component({
	selector: 'kt-user-create',
	templateUrl: './user-create.component.html',
	styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

	user: User;
	loading$: Observable<boolean>;
	userForm: FormGroup;
	hasFormErrors = false;
	hide = true;
	hide1 = true;
	matcher = new MyErrorStateMatcher();
	// Private properties
	private subscriptions: Subscription[] = [];
	countryCode: any;
	curentUser:any;
	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private userFB: FormBuilder,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>,
		private layoutConfigService: LayoutConfigService,
		private authService: AuthService,) { }


	ngOnInit(): void {
		this.loading$ = this.store.pipe(select(selectUsersActionLoading));

		const routeSubscription = this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id && id > 0) {
				this.store.pipe(select(selectUserById(id))).subscribe(res => {
					if (res) {
						this.user = res;
						this.initUser();
					}
				});
			} else {
				this.user = new User();
				this.user.clear();
				this.initUser();
			}
		});
		this.subscriptions.push(routeSubscription);
		this.authService.currentUser().subscribe(
			user => {
			  if (user) {
				this.curentUser = user;
			  }
			}
		  );
	}

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'Create User';
		if (!this.user || !this.user.id) {
			return result;
		}

		result = `Create User`;
		return result;
	}
	/**
	 * Init user
	 */
	initUser() {
		this.createForm();
		if (this.user) {
			this.subheaderService.setTitle('Create user');
			this.subheaderService.setBreadcrumbs([
				{ title: 'User Management', page: `user-management` },
				{ title: 'Create user', page: `user-management/create-user` },
			]);
			return;
		}
	}
	/**
	 * Create form
	 */
	createForm() {
		this.userForm = this.userFB.group({
			username: [this.user.username, Validators.required],
			fullname: [this.user.fullname, Validators.required],
			email: [this.user.email, Validators.email],
			phonenumber: [this.user.phonenumber],
			role: [this.user.role],
			password: ['', [Validators.required]],
			confirmPassword: [''],
		}, { validator: this.checkPasswords });
	}
	checkPasswords(group: FormGroup) { // here we have the 'passwords' group
		const pass = group.controls.password.value;
		const confirmPass = group.controls.confirmPassword.value;

		return pass === confirmPass ? null : { notSame: true }
	}
	/**
	 * Reset
	 */
	reset() {
		this.user = Object.assign({}, this.user);
		this.createForm();
		this.hasFormErrors = false;
		this.userForm.markAsPristine();
		this.userForm.markAsUntouched();
		this.userForm.updateValueAndValidity();
	}
	/**
		* Save data
		*
		* @param withBack: boolean
		*/
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}
		const _user: any = new User();
		_user.clear();
		_user.username = controls.username.value;
		_user.email = controls.email.value;
		_user.fullname = controls.fullname.value;
		_user.phonenumber = this.countryCode + controls.phonenumber.value;
		_user.password = controls.password.value;
		_user.role = controls.role.value;
		_user.user_id=this.curentUser.id;
		this.authService.createUser(_user).subscribe(
			response => {
				if (response) {
					console.log('user not created');
				}
				const message = `New user successfully has been added.`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
				this.router.navigate(['../user-management/users']);
			}
		)
	}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	countryChange(country: any) {
		this.countryCode = '+' + country.dialCode;
	}
}
