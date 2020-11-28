import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl, ReactiveFormsModule, FormGroupDirective, NgForm  } from '@angular/forms';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { SubheaderService, LayoutConfigService } from 'src/app/core/_base/layout';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
		const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}
// services
import { AuthService, EmployeeService } from 'src/app/core/auth/';
import { FileUploadService} from 'src/app/core/auth/_services/file-upload.service';
// Modules
import { Employee} from 'src/app/core/auth/_models/employee.model';
import { UploadResponse } from 'src/app/core/auth/_models/upload-response';

// Models
import { EmployeeWizardClickableStepsComponent } from './steps/employee-wizard-clickable-steps/employee-wizard-clickable-steps.component';
import { EmployeeDetailsComponent } from './steps/employee-details/employee-details.component';
import { EmployeeProfessionalInfoComponent } from './steps/employee-professional-info/employee-professional-info.component';
import { EmployeeDocumentsComponent } from './steps/employee-documents/employee-documents.component';
import { EmployeeGeneratePasswordComponent } from './steps/employee-generate-password/employee-generate-password.component';
import { Update } from '@ngrx/entity';
@Component({
  selector: 'kt-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
  employee:Employee;
  // creating form group
  EmployeeWizardForm: FormGroup;
  employeeForm: FormGroup;
  employeeProfessionalInfoForm: FormGroup;
  employeeDocumentsForm: FormGroup;
  hasFormErrors = false;
  @ViewChild(EmployeeWizardClickableStepsComponent, { static: false })
  employeeWizardClickableStepsComponent: EmployeeWizardClickableStepsComponent;
  @ViewChild(EmployeeDetailsComponent, { static: false }) employeeDetailsComponent: EmployeeDetailsComponent;
  @ViewChild(EmployeeProfessionalInfoComponent, { static: false }) employeeProfessionalInfoComponent: EmployeeProfessionalInfoComponent;
  @ViewChild(EmployeeDocumentsComponent, { static: false }) employeeDocumentsComponent: EmployeeDocumentsComponent;
  @ViewChild(EmployeeGeneratePasswordComponent,
  { static: false }) employeeGeneratePasswordComponent: EmployeeGeneratePasswordComponent;
 // End Mat Auto Chip
  startDate = new Date(1990, 0, 1);
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  @ViewChild('wizard', {static: true}) el: ElementRef;
  submitted = false;
  formBuilder: any;
  controls: any;
  uploadedData: any;
  documentFormData: any;
  countryCode: any;
  curentUser:any;
ngOnInit(): void {
  this.employee = new Employee();
  this.employeeForms();
  this.initEmployee();
  this.activatedRoute.params.subscribe(params => {
    const id = params.id;
    if (id && id > 0) {
      this.employeeService.getEmployeeById(id).subscribe(results => {
              if(results){
                this.employee = results;
                this.initEmployee();
              }
          });
    } else {
        this.employee = new Employee();
        this.employee.clear();
      }
  }),
  this.authService.currentUser().subscribe(
    user => {
      if (user) {
        this.curentUser = user;
      }
    }
  );
}
/* Returns component title
	 */
	getComponentTitle(){
    if (!this.employee.id) {
		let result = 'Create Employee';
    result = `Create Employee`;
    return result;
    }else{
    let result = 'edit Employee';
    result = `Edit Employee`;
    return result;
    }
	}
	/*
	 * Init Employee
	 */
	initEmployee() {
    this.employeeForms();
    if (!this.employee.id) {
			this.subheaderService.setTitle('Create employee');
			this.subheaderService.setBreadcrumbs([
        { title: 'Employee', page: `/employee/employee-create` },
				{ title: 'Create Employee', page: `/employee/employee-create` },
			]);
      return;
    }
    this.subheaderService.setTitle('Edit employee');
  this.subheaderService.setBreadcrumbs([
    { title: 'employee',  page: `/employee/employee-create` },
    { title: 'Edit employee', page: `/employee/employee-create`, queryParams: { id: this.employee.id } }
  ]);

}
  /**
   * component constructor
   * @param employeeFB : FormBuilder
   */
  constructor(
    private employeeFB: FormBuilder,
    private router: Router,
    private subheaderService: SubheaderService,
    private employeeService:EmployeeService,
    private layoutUtilsService: LayoutUtilsService,
    private authService : AuthService,
    private employeeWizardClickableSteps: EmployeeWizardClickableStepsComponent,
    private employeeDetails: EmployeeDetailsComponent,
    private employeeProfessionalInfo: EmployeeProfessionalInfoComponent,
    private employeeDocuments: EmployeeDocumentsComponent,
    private employeeGeneratePassword: EmployeeGeneratePasswordComponent,
    private activatedRoute: ActivatedRoute,
  ){}


// Next Wizard Screen
  nextSubmit() {
    const wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1
    });
    wizard.goNext();
  }
// Previous Wizard Screen
  prevSubmit() {
    const wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1
    });
    wizard.goPrev();
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
		// Initialize form wizard
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1,
      manualStepForward: false
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

  // form validations
  employeeForms(){
    this.EmployeeWizardForm = this.employeeFB.group({
        employeeForm : this.employeeFB.group({
            first_name: [this.employee.first_name, Validators.required],
            last_name: [this.employee.last_name, Validators.required],
            email: [this.employee.email, Validators.email],
            phone_number: [this.employee.phone_number, Validators.required],
            gender: [this.employee.gender, Validators.required],
            birth_date: [this.employee.birth_date],
            address: [this.employee.address, Validators.required],
            city: [this.employee.city, Validators.required],
            pincode: [this.employee.pincode, Validators.required],
        }),
        employeeProfessionalInfoForm: this.employeeFB.group({
            experience_years: [this.employee.experience_years,Validators.required],
            previous_company: [this.employee.previous_company,Validators.required],
            visa_status: [this.employee.visa_status,Validators.required],
            skillGroup: [this.employee.skillGroup,Validators.required],
            hire_date: [this.employee.hire_date,Validators.required],
        }),
        employeeDocumentsForm: this.employeeFB.group({
            id_proof: [this.employee.id_proof,Validators.required],
            visa_type: [this.employee.visa_type,Validators.required],
        }),
        employeeGeneratePasswordForm: this.employeeFB.group({
          password: [this.employee.password],
        })
    })
	}
	 // Reset
	reset() {
		this.employee = Object.assign({}, this.employee);
		this.employeeForms();
		this.hasFormErrors = false;
		this.EmployeeWizardForm.markAsPristine();
		this.EmployeeWizardForm.markAsUntouched();
    this.EmployeeWizardForm.updateValueAndValidity();
    const wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1
    });
    wizard.goTo(1);
	}
  employeeWizardFormSubmit(withBack: boolean = false) {
    this.submitted = true;
    this.hasFormErrors = false;
    const controls =this.EmployeeWizardForm.controls;
    /** check form */
		if (this.EmployeeWizardForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
    }
    const editedEmployee = this.prepareEmployee();

		if (editedEmployee.id > 0) {
			 this.updateEmployee(editedEmployee, withBack);
			 return;
		}
		this.addEmployee(editedEmployee, withBack);
  }
  /** * Returns prepared data for save */
  prepareEmployee():Employee {
  this.controls = this.EmployeeWizardForm.controls;
  const skillGroupSplit = this.controls.employeeProfessionalInfoForm.controls.skillGroup.value.replace('[', '').replace(']', '');
  const skillGroupResult = skillGroupSplit.replace(/[&\/\\# +()$~%.'":*?<>{}]/g, '');
  const uploadProfDocument =this.employeeDocumentsComponent.uploadedData[0]['filename']  ;
  const uploadedVisaDocument = this.employeeDocumentsComponent.documentFormData[0]['filename'];
  const _employee: any = new Employee();
  _employee.clear();
  _employee.id = this.employee.id;
  _employee.first_name =  this.controls.employeeForm.controls.first_name.value;
  _employee.last_name =  this.controls.employeeForm.controls.last_name.value;
  _employee.email =  this.controls.employeeForm.controls.email.value;
  if(this.employeeDetailsComponent.countryCode === undefined){
   _employee.phone_number =  this.controls.employeeForm.controls.phone_number.value;
  }else{
  _employee.phone_number =  this.employeeDetailsComponent.countryCode + this.controls.employeeForm.controls.phone_number.value;
  }
  _employee.address =  this.controls.employeeForm.controls.address.value;
  _employee.city =  this.controls.employeeForm.controls.city.value;
  _employee.pincode =  this.controls.employeeForm.controls.pincode.value;
  _employee.gender =  this.controls.employeeForm.controls.gender.value;
  _employee.birth_date =  this.controls.employeeForm.value.birth_date;
  _employee.visa_status =  this.controls.employeeProfessionalInfoForm.controls.visa_status.value;
  _employee.experience_years =  this.controls.employeeProfessionalInfoForm.controls.experience_years.value;
  _employee.hire_date =  this.controls.employeeProfessionalInfoForm.controls.hire_date.value;
  _employee.previous_company =  this.controls.employeeProfessionalInfoForm.controls.previous_company.value;
  _employee.skillGroup =  skillGroupResult;
  _employee.id_proof =  uploadProfDocument;
  _employee.visa_type = uploadedVisaDocument;
  _employee.password =  this.controls.employeeGeneratePasswordForm.controls.password.value;
  _employee.user_id=this.curentUser.id;
  return _employee
}
addEmployee(_employee:Employee, withBack: boolean = false){
  this.employeeService.saveEmployee(_employee).subscribe(
    response => {
        if (!response) {
          // tslint:disable-next-line: no-
          ;
            console.log('employee not created');
        }
        withBack = true;
        const message = `New employee successfully has been added.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
        this.router.navigate(['../employee/employee-list']);
    });
}
updateEmployee(_employee:Employee, withBack: boolean = false){
  const updateEmployee: Update<Employee> = {
    id: _employee.id,
    changes: _employee
  };
  this.employeeService.updateEmployee(_employee).subscribe(
    response => {
      if (!response.id) {
        console.log('employee not updated');
      }
      withBack = true;
      const message = `employee updated successfully.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
    }
  )
}
	 // Close Alert

	 // @param $event: Event
	  onAlertClose($event) {
		this.hasFormErrors = false;
	}
  goBackWithoutId() {
		this.router.navigateByUrl('/employee/employee-list', { relativeTo: this.activatedRoute });
  }
}
