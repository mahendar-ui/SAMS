import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { JobPortal } from '../../../../core/auth'
import { JobportalService } from '../../../../core/auth';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { SubheaderService } from 'src/app/core/_base/layout';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
@Component({
  selector: 'kt-job-portal-create',
  templateUrl: './job-portal-create.component.html',
  styleUrls: ['./job-portal-create.component.scss']
})
export class JobPortalCreateComponent implements OnInit {

  // creating form group
  JobPortalForm: FormGroup;
  // model
  jobportal: JobPortal;
  hasFormErrors = false;
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
  private editorSubject: Subject<any> = new AsyncSubject();
  /**
   * component constructor
   * @param JobPortalFB : FormBuilder
   */
  constructor(
    private JobPortalFB: FormBuilder,
    private jobportalservice: JobportalService,
    private layoutUtilsService: LayoutUtilsService,
    private subheaderService: SubheaderService,
    private router: Router,) {
    // Mat Auto Complete functions
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
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
    this.JobPortalForm.get('skillGroup').setValue(myObjStr);

    // Added

    const index = this.allSkills.indexOf(event.option.viewValue);
    if (index >= 0) {
      this.allSkills.splice(index, 1);
    }

    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);

  }
  //  End of Mat Chip Skill
  ngOnInit(): void {
    this.jobportal = new JobPortal();
    this.jobPortalForms();
    this.jobbreadcrumb();
  }
  getComponentTitle() {
    let result = 'Create Jobportal';
    result = `Create Jobportal`;
    return result;
  }
  /**
	  * Reset
	  */
  reset() {
    this.jobportal = Object.assign({}, this.jobportal);
    this.jobPortalForms();
    this.hasFormErrors = false;
    this.JobPortalForm.markAsPristine();
    this.JobPortalForm.markAsUntouched();
    this.JobPortalForm.updateValueAndValidity();
  }
  jobbreadcrumb() {
    this.subheaderService.setTitle('Create Jobportal');
    this.subheaderService.setBreadcrumbs([
      { title: 'Jobportal', page: `/job-portal/job-portal-create` },
      { title: 'Create Jobportal', page: `/job-portal/job-portal-create` },
    ]);
    return;
  }
  // form validations
  jobPortalForms() {
    this.JobPortalForm = this.JobPortalFB.group({
      jobtitle: [this.jobportal.jobtitle, Validators.required],
      Address: [this.jobportal.Address, Validators.required],
      location: [this.jobportal.location, Validators.required],
      jobtype: [this.jobportal.jobtype, Validators.required],
      companyname: [this.jobportal.companyname, Validators.required],
      startdate: [this.jobportal.startdate, Validators.required],
      enddate: [this.jobportal.enddate, Validators.required],
      jobdescription: [this.jobportal.jobdescription,Validators.maxLength(10)],
      skillGroup: [this.jobportal.skillGroup, Validators.required],
    });
  }
  onSubmit() {
    const controls = this.JobPortalForm.controls;
    this.hasFormErrors = false;
    /** check form */
    if (this.JobPortalForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    }
    const _jobportal: any = new JobPortal();
    _jobportal.clear();
  const skillGroupSplit = controls.skillGroup.value.replace("[", "").replace("]", "");
  const skillGroupResult = skillGroupSplit.replace(/[&\/\\# +()$~%.'":*?<>{}]/g, '');
    _jobportal.jobtitle = controls.jobtitle.value;
    _jobportal.jobdescription = controls.jobdescription.value;
    _jobportal.startdate = controls.startdate.value;
    _jobportal.enddate = controls.enddate.value;
    _jobportal.Address = controls.Address.value;
    _jobportal.location = controls.location.value;
    _jobportal.companyname = controls.companyname.value;
    _jobportal.jobtype = controls.jobtype.value;
    _jobportal.skillGroup = skillGroupResult;
    this.jobportalservice.saveJobPortal(_jobportal).subscribe(
      response => {
        if (!response.id) {
          // tslint:disable-next-line: no-
          ;
          console.log('Jobportal not created');
        }
        const message = `New Jobportal successfully has been added.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
        this.router.navigate(['../job-portal/jobportal-list']);
      }
    )
  }
/*** @param $event: Event
*/
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }
}
