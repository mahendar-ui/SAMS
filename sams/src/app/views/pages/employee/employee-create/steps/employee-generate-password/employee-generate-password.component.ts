import { AfterViewInit, Component, ElementRef, OnInit,
	ViewContainerRef, ViewChild, ChangeDetectionStrategy, Directive, HostListener, Output, EventEmitter, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Modules
import { Employee } from '../../../../../../core/auth/_models/employee.model';
// services
import { EmployeeService } from 'src/app/core/auth/';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';

@Component({
  selector: 'kt-employee-generate-password',
  templateUrl: './employee-generate-password.component.html',
  styleUrls: ['./employee-generate-password.component.scss']
})
export class EmployeeGeneratePasswordComponent implements OnInit {

  @Input() employeeGeneratePasswordForm: FormGroup;
  @Output() employeeWizardFormSubmit = new EventEmitter<any>();
  @Output() prevSubmit = new EventEmitter<any>();

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


  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private layoutUtilsService: LayoutUtilsService,
  ) { }

  ngOnInit(): void {
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
public generatePassword() {
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
   // Prev Step
 prevStep() {
	this.prevSubmit.next();
   }
}
