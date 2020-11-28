import { AfterViewInit, Component, ElementRef, OnInit, ViewContainerRef, 
  ViewChild, ChangeDetectionStrategy, Directive, HostListener, Output, EventEmitter, Inject, Input } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee, EmployeeService } from 'src/app/core/auth';
import { SubheaderService } from 'src/app/core/_base/layout';

@Component({
  selector: 'kt-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  @Input() employeeForm: FormGroup;
  @Output() nextSubmit = new EventEmitter<any>();
  countryCode: any;
  constructor(private activatedRoute: ActivatedRoute,
    private employeeFB: FormBuilder,
    private subheaderService: SubheaderService,
    private employeeService:EmployeeService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.employeeService.getEmployeeById(id).subscribe(results => {
                if(results){
                  this.employee = results;
                  this.employeeForm.patchValue({
                    first_name: this.employee.first_name,
                    last_name: this.employee.last_name,
                    email: this.employee.email,
                    phone_number: this.employee.phone_number,
                    gender:this.employee.gender,
                    birth_date:this.employee.birth_date,
                    address:this.employee.address,
                    city:this.employee.city,
                    pincode:this.employee.pincode,
                  })
                }
            });
      } else {
          this.employee = new Employee();
          this.employee.clear();
        }
    })
}
  // Next Step
  nextStep() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    } else {
      this.nextSubmit.next();
    }
  }
// phone number function

countryChange(country: any) {
  this.countryCode = '+' + country.dialCode;
}
}
