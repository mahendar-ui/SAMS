import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthNoticeService, Account,AccounService } from '../../../../core/auth';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
interface stakeHolders {
	value: string;
	viewValue: string;
  }
@Component({
  selector: 'kt-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {
  accountForm : FormGroup;
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
    loading = false;
    private unsubscribe: Subject<any>;
  constructor(private fb: FormBuilder,
    private authNoticeService: AuthNoticeService,
    private accountService:AccounService) {this.unsubscribe = new Subject(); }

  ngOnInit(): void {
    this.accountRgisterForm();
  }
  accountRgisterForm(){
    this.accountForm = this.fb.group({
			
			firstname: ['', Validators.compose([
				Validators.required
			])
      ],
      lastname: ['', Validators.compose([
				Validators.required
			])
			],
			student_email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320)
			]),
      ],
      student_id: ['', Validators.compose([
				Validators.required,
			]),
			],
			phone_number: ['', Validators.compose([
				Validators.required
			]),
			],
			university: ['', Validators.compose([
				Validators.required
			])
      ],
      bank: ['', Validators.compose([
				Validators.required
			])
      ],
      course: ['', Validators.compose([
				Validators.required
			])
			],
			address: ['', Validators.compose([
				Validators.required
			])
      ],
      city: ['', Validators.compose([
				Validators.required
			])
      ],
      postcode: ['', Validators.compose([
				Validators.required
			])
	  ],
	  passport: ['', Validators.compose([
		Validators.required
	])
],
brpnumber: ['', Validators.compose([
	Validators.required
])
],
      message: [''],
			
		})
  }
  submit() {
		const controls = this.accountForm.controls;

		// check form
		if (this.accountForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
    const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
		const _account: Account = new Account();
		_account.clear();
		_account.firstname = controls.firstname.value;
		_account.lastname = controls.lastname.value;
		_account.student_id = controls.student_id.value;
		_account.student_email = controls.student_email.value;
    _account.phone_number = controls.phone_number.value;
    _account.university = controls.university.value;
    _account.bank = controls.bank.value;
    _account.course = controls.course.value;
    _account.address = controls.address.value;
    _account.city = controls.city.value;
	_account.postcode = controls.postcode.value;
	_account.passport =controls.passport.value;
	_account.brpnumber =controls.brpnumber.value;
	_account.user_id = authInfo.userInfo.id;
		this.accountService.register(_account).pipe(
			tap(account => {
				if (account) {
					if(account.errorCode == 404){
						this.authNoticeService.setNotice('You application submition failed', 'danger');
					}else{
					
						// pass notice message to the login page
						this.authNoticeService.setNotice('Your application successfully submited.', 'success');
					
					}
					
				} else {
					this.authNoticeService.setNotice('', 'danger');
				}
			}),
			takeUntil(this.unsubscribe),
			finalize(() => {
				this.loading = false;
				
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
		const control = this.accountForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
