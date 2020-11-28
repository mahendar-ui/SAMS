import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { MatDialog } from '@angular/material/dialog';
// service
import { JobportalService } from '../../../../core/auth';
// model
import { JobPortal } from '../../../../core/auth';
import { tap, startWith, map } from 'rxjs/operators';
import { LoadEntityDialogComponent } from 'src/app/views/partials/content/crud';
import { SubheaderService } from 'src/app/core/_base/layout';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { split } from 'lodash';
@Component({
  selector: 'kt-jobportaledit',
  templateUrl: './jobportaledit.component.html',
  styleUrls: ['./jobportaledit.component.scss']
})
export class JobportaleditComponent implements OnInit {
  jobportal: JobPortal;
  jobPortalForm: FormGroup;
  jobportalData = false;
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
  skillGroupRes: any;
  constructor(private jobportalFB: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private jobportalService: JobportalService,
    private activatedRoute: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    private subheaderService: SubheaderService,
    public dialog: MatDialog,) {
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
    // this.jobPortalForm.get('skillGroup').setValue(myObjStr);

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
  // form validations
  jobPortalForms() {
    this.jobPortalForm = this.jobportalFB.group({
      jobtitle: [this.jobportal.jobtitle, Validators.required],
      Address: [this.jobportal.Address, Validators.required],
      location: [this.jobportal.location, Validators.required],
      jobtype: [this.jobportal.jobtype, Validators.required],
      companyname: [this.jobportal.companyname, Validators.required],
      startdate: [this.jobportal.startdate, Validators.required],
      enddate: [this.jobportal.enddate, Validators.required],
      jobdescription: [this.jobportal.jobdescription, Validators.required],
      skillGroup: [this.jobportal.skillGroup, Validators.required],
    });
  }
  ngOnInit() {
    this.jobPortalForm = new FormGroup({
     });
    this.jobbreadcrumb();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.jobportalService.getJobPortalById(id).pipe(tap(results => {
          if(results){
            this.jobportalData = true;
            this.jobportal = results;
            this.skillGroupRes = [this.jobportal.skillGroup.replace(/[&\/\\# +()$~%.'":*?<>{}]/g, '')];
            this.skills = split(this.skillGroupRes,',') ;
            this.removeSkillsByLoad(this.skills);
            this.jobPortalForm = this.jobportalFB.group({
              jobportalDetails : this.jobportalFB.group({
                jobtitle : [this.jobportal.jobtitle],
                jobdescription : [this.jobportal.jobdescription],
                Address : [this.jobportal.Address],
                location : [this.jobportal.location],
                companyname : [this.jobportal.companyname],
                startdate :[this.jobportal.startdate],
                enddate :[this.jobportal.enddate],
                skillGroup :[this.jobportal.skillGroup],
                jobtype:[this.jobportal.jobtype],
              }),
            });
          }
        }),
      )
      .subscribe();
  }else{
    return;
  }
})
}
jobbreadcrumb() {
  this.subheaderService.setTitle('Jobportal Edit');
  this.subheaderService.setBreadcrumbs([
    { title: 'Jobportal', page: `/job-portal/job-portal-create` },
    { title: 'Jobportal Edit', page: `/job-portal/jobportal/edit/` },
  ]);
  return;
}
  onSubmit() {
    this.jobportal.jobtitle = this.jobPortalForm.controls.jobportalDetails.value.jobtitle;
    this.jobportal.jobdescription = this.jobPortalForm.controls.jobportalDetails.value.jobdescription;
    this.jobportal.Address = this.jobPortalForm.controls.jobportalDetails.value.Address;
    this.jobportal.location = this.jobPortalForm.controls.jobportalDetails.value.location;
    this.jobportal.companyname = this.jobPortalForm.controls.jobportalDetails.value.companyname
    this.jobportal.startdate = this.jobPortalForm.controls.jobportalDetails.value.startdate;
    this.jobportal.enddate = this.jobPortalForm.controls.jobportalDetails.value.enddate;
    this.jobportal.skillGroup = this.jobPortalForm.controls.jobportalDetails.value.skillGroup;
    this.jobportal.jobtype = this.jobPortalForm.controls.jobportalDetails.value.jobtype;
    this.jobportalService.updateJobPortal(this.jobportal).subscribe(
		  results => {
      this.dialog.open(LoadEntityDialogComponent, {
        width: 'auto',
        height : 'auto',
        disableClose: true,
        data : {title : 'Loading...'}
        });
			if(!results){
				  console.log('JobPortal not updated');
      }
      const message = `JobPortal successfully has been saved.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
      this.dialog.closeAll();
		 }
    )
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
