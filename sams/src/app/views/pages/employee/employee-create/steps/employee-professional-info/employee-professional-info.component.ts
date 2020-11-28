import { AfterViewInit, Component, ElementRef, OnInit, ViewContainerRef, ViewChild, ChangeDetectionStrategy, Directive, HostListener, Output, EventEmitter, Inject, Input } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Employee, EmployeeService } from 'src/app/core/auth';
import { SubheaderService } from 'src/app/core/_base/layout';
import { ActivatedRoute } from '@angular/router';
import { split } from 'lodash';

@Component({
  selector: 'kt-employee-professional-info',
  templateUrl: './employee-professional-info.component.html',
  styleUrls: ['./employee-professional-info.component.scss']
})
export class EmployeeProfessionalInfoComponent implements OnInit {
  employee: Employee;
  // Mat Auto Chip
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = [];
  allSkills: string[] = ['AngularJS', 'Linux', 'Php', 'Java', 'HTML'];
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Input() employeeProfessionalInfoForm: FormGroup;
  @Output() nextSubmit = new EventEmitter<any>();
  @Output() prevSubmit = new EventEmitter<any>();
  skillGroupRes: any;
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);

  }
  constructor(private activatedRoute: ActivatedRoute,
    private employeeFB: FormBuilder,
    private subheaderService: SubheaderService,
    private employeeService:EmployeeService) {
    // Mat Auto Complete functions
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.employeeService.getEmployeeById(id).subscribe(results => {
                if(results){
                  this.employee = results;
                  this.skillGroupRes = [this.employee.skillGroup.replace(/[&\/\\# +()$~%.'":*?<>{}]/g, '')];
                  this.skills = split(this.skillGroupRes,',') ;
                  this.removeSkillsByLoad(this.skills);
                  this.employeeProfessionalInfoForm.patchValue({
                    experience_years: this.employee.experience_years,
                    previous_company: this.employee.previous_company,
                    hire_date: this.employee.hire_date,
                    phone_number: this.employee.phone_number,
                    visa_status:this.employee.visa_status,
                    skillGroup:this.employee.skillGroup,
                  })
                  this.initEmployee();
                }
            });
      } else {
          this.employee = new Employee();
          this.employee.clear();
        }
    })
  }
  initEmployee(){

  }
  // Mat Auto Complete Skills Filter
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.skillCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
      this.allSkills.push(skill);
      this.skillInput.nativeElement.value = '';
      this.skillCtrl.setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    const myObjStr = JSON.stringify(this.skills);
    console.log(myObjStr);
    this.employeeProfessionalInfoForm.get('skillGroup').setValue(myObjStr);

    // Added

    const index = this.allSkills.indexOf(event.option.viewValue);
    if (index >= 0) {
      this.allSkills.splice(index, 1);
    }

    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  // Next Step
  nextStep() {
    if (this.employeeProfessionalInfoForm.invalid) {
      this.employeeProfessionalInfoForm.markAllAsTouched();
      return;
    } else {
      this.nextSubmit.next();
    }
  }
  // Prev Step
 prevStep() {
   this.prevSubmit.next();
  }
  // Removed Selected Skills by on load
  removeSkillsByLoad(skills: any): void {
    for (let i = 0; i < skills.length; i++){
      const index = this.allSkills.indexOf(skills[i]);
      if (index >= 0) {
        this.allSkills.splice(index, 1);
      }
    }
    return;
  }
}
