// Angular
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
// Services and Models
import {
	User,
	UserUpdated,
	Address,
	SocialNetworks,
	selectHasUsersInStore,
	selectUserById,
	UserOnServerCreated,
	selectLastCreatedUserId,
	selectUsersActionLoading,
	AuthService
} from '../../../../../core/auth';
import { tap } from 'rxjs/operators';
import { LoadEntityDialogComponent } from '../../../../partials/content/crud/loading-entity-dialog/loading-entity-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'kt-user-edit',
	templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit, OnDestroy {
	/**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param userFB: FormBuilder
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private userFB: FormBuilder,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>,
		private layoutConfigService: LayoutConfigService,
		private authService: AuthService,
		public dialog: MatDialog,) { }
	// Public properties
	user: User;
	loading$: Observable<boolean>;
	userForm: FormGroup;
	userData: boolean;
	hide = true;
	countryCode: any;
	// Alternative for checkboxes
	checkboxes = [
		{
			id: 'lowercase',
			label: 'a-z',
			library: 'abcdefghijklmnopqrstuvwxyz',
			checked: true
		}, {
			id: 'uppercase',
			label: 'A-Z',
			library: 'ABCDEFGHIJKLMNOPWRSTUVWXYZ',
			checked: true
		}, {
			id: 'numbers',
			label: '0-9',
			library: '0123456789',
			checked: true
		}, {
			id: 'symbols',
			label: '!-?',
			library: '!@#$%^&*-_=+\\|:;\',.\<>/?~',
			checked: false
		}
	]


	// tslint:disable-next-line: ban-types
	dictionary: Array<String>;
// tslint:disable-next-line: ban-types
	lowercase: Boolean = this.checkboxes[0].checked;
	// tslint:disable-next-line: ban-types
	uppercase: Boolean = this.checkboxes[1].checked;
	// tslint:disable-next-line: ban-types
	numbers: Boolean = this.checkboxes[2].checked;
	// tslint:disable-next-line: ban-types
	symbols: Boolean = this.checkboxes[3].checked;
// tslint:disable-next-line: ban-types
	passwordLenght: Number = 8;
	// tslint:disable-next-line: ban-types
	buttonLabel: String = 'Generate';
	// tslint:disable-next-line: ban-types
	newPassword: String;

	// Copy password to clipboard
	@ViewChild('passwordOutput') password: ElementRef;

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.loading$ = this.store.pipe(select(selectUsersActionLoading));
		this.userForm = new FormGroup({
			username: new FormControl()
		});
		this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id && id > 0) {
				this.authService.getUserById(id).pipe(tap(results => {
					if (results) {
						this.userData = true;
						this.user = results;
						this.initUser();
						this.userForm = this.userFB.group({
							userDetails: this.userFB.group({
								username: [this.user.username],
								fullname: [this.user.fullname],
								phonenumber: [this.user.phonenumber],
								role: [this.user.role],
								email: [this.user.email],
								password: [this.user.password],
							}),
						});
					}
				}),
				)
					.subscribe();
			} else {
				this.user = new User();
				this.user.clear();
				this.initUser();
				return;
			}
		})
	}

	ngOnDestroy() {
	}

	/**
	 * Init user
	 */
	initUser() {
		this.createForm();
		if (!this.user.id) {
			this.subheaderService.setTitle('Create user');
			this.subheaderService.setBreadcrumbs([
				{ title: 'User Management', page: `user-management` },
				{ title: 'Users', page: `user-management/users` },
				{ title: 'Update user', page: `user-management/users/add` }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit user');
		this.subheaderService.setBreadcrumbs([
			{ title: 'User Management', page: `user-management` },
			{ title: 'Users', page: `user-management/users` },
			{ title: 'Edit user', page: `user-management/users/edit`, queryParams: { id: this.user.id } }
		]);
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
			// roles: [this.user.roles],
			password: [this.user.password],
			role: [null, Validators.compose([Validators.required])],
		});
	}

	/**
	 * Redirect to list
	 *
	 */
	goBackWithId() {
		const url = `/user-management/users`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Refresh user
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshUser(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/user-management/users/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */

	onSubmit() {
		this.user.username = this.userForm.controls.userDetails.value.username;
		this.user.fullname = this.userForm.controls.userDetails.value.fullname;
		this.user.email = this.userForm.controls.userDetails.value.email;
		if(this.countryCode == undefined){
			this.user.phonenumber  = this.userForm.controls.userDetails.value.phonenumber;
		}else{
		this.user.phonenumber = this.countryCode + this.userForm.controls.userDetails.value.phonenumber;
		}
		this.user.role = this.userForm.controls.userDetails.value.role;
		this.user.password = this.userForm.controls.userDetails.value.password;
		this.authService.updateUser(this.user).subscribe(
			results => {
				this.dialog.open(LoadEntityDialogComponent, {
					width: 'auto',
					height: 'auto',
					disableClose: true,
					data: { title: 'Loading...' }
				});
				if (!results) {
					console.log('user not updated');
				}
				const message = `user successfully has been updated.`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
				this.dialog.closeAll();
				//   this.router.navigate(['../user-management/users']);
			}
		)
	}
	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'Create user';
		if (!this.user || !this.user.id) {
			return result;
		}

		result = `Edit user - ${this.user.fullname}`;
		return result;
	}

	// Password length
	private updatePasswordLength(event) {
		this.passwordLenght = event.target.value;
	}
	private copyPassword() {
		const inputElement = this.password.nativeElement as HTMLInputElement;
		inputElement.select();
		document.execCommand('copy');
	}

	// Generate password
	private generatePassword() {
		if (this.lowercase === false && this.uppercase === false && this.numbers === false && this.symbols === false) {
			return this.newPassword = '...';
		}

		// Create array from chosen checkboxes
		this.dictionary = [].concat(
			this.lowercase ? this.checkboxes[0].library.split('') : [],
			this.uppercase ? this.checkboxes[1].library.split('') : [],
			this.numbers ? this.checkboxes[2].library.split('') : [],
			this.symbols ? this.checkboxes[3].library.split('') : []
		);

		// Generate random password from array
		let newPassword = '';
		for (let i = 0; i < this.passwordLenght; i++) {
			newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
		}
		this.newPassword = newPassword;

		// Call copy function
		setTimeout(() => this.copyPassword());

		// Change text on button when clicked
		this.buttonLabel = 'Copied!';
		setTimeout(() => { this.buttonLabel = 'Generate' }, 1000);
	}

	countryChange(country: any) {
		this.countryCode = '+'+ country.dialCode;
	}
}
