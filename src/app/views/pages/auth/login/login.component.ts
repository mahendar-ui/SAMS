// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject, of } from 'rxjs';
import { finalize, takeUntil, tap, catchError } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
//selector
import { isLoggedIn } from '../../../../core/auth/_selectors/auth.selectors';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { environment } from '../../../../../environments/environment';
// Auth
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	EMAIL: 'mahi@gmail.com',
	PASSWORD: '1234'
};
interface stakeHolders {
	value: string;
	viewValue: string;
  }
@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	stakeHolders: stakeHolders[] = [
		{value: 'US', viewValue: 'Student'},
		{value: 'BOS', viewValue: 'Bank'},
		{value: 'UAD', viewValue: 'University'}
	  ];
	private unsubscribe: Subject<any>;

	private returnUrl: any;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		if(isLoggedIn){
			this.router.navigateByUrl('/dashboard');
		}
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		this.loginForm = this.fb.group({
			stakeholder: ['', Validators.compose([
				Validators.required
			])
			],
			email: [DEMO_PARAMS.EMAIL, Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320) 
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			stakeholder : controls.stakeholder.value,
			email: controls.email.value,
			password: controls.password.value
		};
		this.auth
			.login(authData.stakeholder, authData.email, authData.password)
			.pipe(
				tap(Auth => {
					if (Auth.accessToken) {
						debugger;
						this.store.dispatch(new Login({authToken: Auth.accessToken}));
						localStorage.setItem(environment.authTokenKey, Auth.accessToken);
						localStorage.setItem('authInfo', JSON.stringify(Auth));
						const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
						// navigating user login to account list page
						if(authInfo.userInfo.stakeholder == 'BOS'||authInfo.userInfo.stakeholder == 'US'||authInfo.userInfo.stakeholder == 'UAD'){
							this.router.navigate(['../account-management/account-list']);
						  }else{
						this.router.navigate([this.returnUrl]); // Main page
						  }
					} else {
						this.errors = Auth;
						if(this.errors.errorCode == 500){
							this.router.navigateByUrl('error/500');
						}
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
					}
				}),
				catchError(err => {
					console.log(err);
					//this.router.navigateByUrl('error/500');
					return of([]);
				  }),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				}),
				
			)
			
			.subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
