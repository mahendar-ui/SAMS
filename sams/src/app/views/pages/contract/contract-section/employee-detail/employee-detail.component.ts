import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Employee, EmployeeService } from 'src/app/core/auth';
import { ContractService } from 'src/app/core/auth/_services/contract.service';

@Component({
  selector: 'kt-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employeeForm: FormGroup;
  @Input() employeeDetailForm: FormGroup;
  @Output() nextSubmit = new EventEmitter<any>();
  @Output() prevSubmit = new EventEmitter<any>();
  employees = [];
  employee: Employee;
  employeename: any;
  filteredOptions: Observable<any[]>;
  employeeControl = new FormControl('', [
    Validators.required,
    forbiddenNamesValidator(this.employees)
  ]);
  constructor(private employeeService: EmployeeService,
    private contractService: ContractService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.filteredOptions = this.employeeControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        switchMap(value => this.filter(value))
      );
    this.employeeForm.controls.first_name.disable();
    this.employeeForm.controls.last_name.disable();
    this.employeeForm.controls.email.disable();
    this.employeeForm.controls.phone_number.disable();
    this.employeeForm.controls.birth_date.disable();
    this.employeeForm.controls.gender.disable();
    this.employeeForm.controls.address.disable();
    this.employeeForm.controls.city.disable();
    this.employeeForm.controls.pincode.disable();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.contractService.getContractById(id).subscribe(results => {
          if (results) {
            this.employeename = results;
            this.employeeForm.patchValue({
              first_name: this.employeename.employee.first_name,
              last_name: this.employeename.employee.last_name,
              email: this.employeename.employee.email,
              phone_number: this.employeename.employee.phone_number,
              birth_date: this.employeename.employee.birth_date,
              gender: this.employeename.employee.gender,
              address: this.employeename.employee.address,
              city: this.employeename.employee.city,
              pincode: this.employeename.employee.pincode,
            }),this.employeeDetailForm.patchValue({
              first_name: this.employeename.employee.first_name,
            }),
            this.employeeDetailForm.controls.first_name.disable();
          }
        });
      }
    });
    this.employeeDetailForm = new FormGroup({
      first_name: new FormControl({}),
    })
    this.getallEmployees();
  }
  filter(value: string) {
    return this.employeeService.getAllEmployees()
      .pipe(
        map(response => response.filter(employee => {
          return employee.first_name.toLowerCase().indexOf(value) >= 0
        }))
      )
  }
  getallEmployees() {
    this.employeeService.getAllEmployees().subscribe(results => {
      if (results) {
        this.employees = results;
      }
    });
  }
  applyemployeeFilter(event) {
    // const controls = this.employeeDetailForm.controls;
    // const _employee : any = new Employee();
    // _employee.clear();
    // _employee.first_name = controls.first_name.value;
    const id = event.id;
    this.employeeService.getEmployeeById(id).subscribe(results => {
      if (results) {
        this.employee = results;
        this.employeeForm.patchValue({
          id: this.employee.id,
          first_name: this.employee.first_name,
          last_name: this.employee.last_name,
          email: this.employee.email,
          phone_number: this.employee.phone_number,
          birth_date: this.employee.birth_date,
          gender: this.employee.gender,
          address: this.employee.address,
          city: this.employee.city,
          pincode: this.employee.pincode,
        })
      }
    });
  }
  // Prev Step
  prevStep() {
    this.prevSubmit.next();
  }
  displayFn(employee) {
    if (employee && employee.first_name) {
      return employee.first_name.toLowerCase();
    } else {
      return employee
    }
  }

}
export function forbiddenNamesValidator(Services: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const index = Services.findIndex(Service => {
      return new RegExp("^" + Service.first_name + "$").test(control.value);
    });
    return index < 0 ? { forbiddenNames: { value: control.value } } : null;
  };
}