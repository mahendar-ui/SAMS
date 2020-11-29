// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Register, User } from '../../../../core/auth/';
import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
interface stakeHolders {
	value: string;
	viewValue: string;
  }
@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})

  
export class RegisterComponent implements OnInit, OnDestroy {
	
	registerForm: FormGroup;
	universityField : boolean = false;
	bankField : boolean = false;
	loading = false;
	errors: any = [];
	loginType : any;
	stakeHolders: stakeHolders[] = [
		{value: 'US', viewValue: 'Student'},
		{value: 'BOS', viewValue: 'Bank'},
		{value: 'UAD', viewValue: 'University'}
	  ];
	  universities: stakeHolders[] = [
		{value: 'UEL', viewValue: 'University of East London'},
		{value: 'UCL', viewValue: 'University College London '},
		{value: 'LSE', viewValue: 'London School of Economics and Political Science'}
	  ];
	  banks: stakeHolders[] = [
		{value: 'HSBC', viewValue: 'HSBC'},
		{value: 'LLOYDS', viewValue: 'Lloyds'},
		{value: 'BARCLAYS', viewValue: 'Barclays'}
	  ];
	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {
		this.initRegisterForm();
	}
	ngDoCheck(){
		
		if(localStorage.getItem('portal')){
			debugger;
			this.loginType = localStorage.getItem('portal');
			this.selectLogin(this.loginType);
			}else{
				this.loginType = ''
			}
	}
	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}
	selectedChange({value}):void{
		if(value == 'US' || value == 'UAD'){
			this.bankField = false;
			this.universityField = true;
		}else{
			this.universityField = false;
			this.bankField = true;
		}
	}
	selectLogin(value):void{
		if(value == 'US' || value == 'UAD'){
			this.bankField = false;
			this.universityField = true;
		}else{
			this.universityField = false;
			this.bankField = true;
		}
	}
	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			stakeholder: ['', Validators.compose([
				Validators.required
			])
			],
			fullname: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320)
			]),
			],
			username: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			]),
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			confirmPassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.registerForm.controls;

		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		if (!controls.agree.value) {
			// you must agree the terms and condition
			// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
			this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			return;
		}

		const _user: User = new User();
		_user.clear();
		_user.stakeholder = controls.stakeholder.value;
		_user.email = controls.email.value;
		_user.username = controls.username.value;
		_user.fullname = controls.fullname.value;
		_user.password = controls.password.value;
		this.auth.register(_user).pipe(
			tap(user => {
				if (user) {
					if(user.errorCode == 404){
						this.authNoticeService.setNotice(this.translate.instant(user.message), 'danger');
					}else{
						this.store.dispatch(new Register({authToken: user.accessToken}));
						// pass notice message to the login page
						this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
						setTimeout(()=>{
							this.router.navigateByUrl('/auth/login');
						},500)
						
					}
					
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
				}
			}),
			takeUntil(this.unsubscribe),
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			})
		).subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
