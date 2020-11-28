import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'kt-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit, AfterViewInit {

	@ViewChild('wizard', {static: true}) el: ElementRef;

	model: any = {
    fname: '',
    lname: '',
    phone: '',
    email: '',
		postcode: '',
		city: '',
		state: '',
    country: '',
    experience: '',
    Company: '',
    visa: '',
    skills:'',
	};
	submitted = false;

	nestedForm: FormGroup;
  constructor(private _fb: FormBuilder) { }

	ngOnInit() {
    this.nestedForm = this._fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]]
    });
	}
  get firstName() {
    return this.nestedForm.get('firstName');
  }
	ngAfterViewInit(): void {
		// Initialize form wizard
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
		});

		// Validation before going to next page
		wizard.on('beforeNext', (wizardObj) => {
			// https://angular.io/guide/forms
			// https://angular.io/guide/form-validation

			// validate the form and use below function to stop the wizard's step
			// wizardObj.stop();
		});

		// Change event
		wizard.on('change', () => {
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});
	}

  onSubmit() {
    this.submitted = true;
  console.log(`${this.model.fname}\n${this.model.lname}\n${this.model.phone}\n${this.model.email}\n${this.model.postcode}\n${this.model.city}\n${this.model.state}\n${this.model.country}\n${this.model.experience}\n${this.model.visa}\n${this.model.skills}\n${this.model.Company}\n`);
	}

}
