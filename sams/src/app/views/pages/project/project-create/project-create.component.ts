import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import * as moment from 'moment';
// services
import { AuthService, ClientService, ProjectService, selectUsersActionLoading} from '../../../../core/auth';
// model
import { Project } from '../../../../core/auth';
import { SubheaderService } from 'src/app/core/_base/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/reducers';
import { Store, select } from '@ngrx/store';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'kt-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

 project: Project;
  // creating form group
 projectForm: FormGroup;
 hasFormErrors = false;
 loading$: Observable<boolean>;
 clients = [];
 myControl = new FormControl();
 filteredOptions: Observable<any[]>;
 // tslint:disable-next-line: variable-name
 startdate = new FormControl(new Date());
 enddate = new FormControl(new Date());
 curentUser:any;
 constructor(
   private projectFB: FormBuilder,
   private layoutUtilsService: LayoutUtilsService,
   private projectservice:ProjectService,
   private subheaderService: SubheaderService,
   private clientService: ClientService,
   private authService : AuthService,
   private router: Router,
   private store: Store<AppState>,
 ) { }
 ngOnInit(): void {
  this.filteredOptions = this.myControl.valueChanges
  .pipe(
    startWith(''),
    debounceTime(400),
    switchMap(value => this.filter(value))
  );
  this.loading$ = this.store.pipe(select(selectUsersActionLoading));
   this.project = new Project();
   this.projectForms();
   this.initUser();
   this.getallClients();
   this.authService.currentUser().subscribe(
    user => {
      if (user) {
        this.curentUser = user;
      }
    }
  );
 }
 // filter with mat auto completenames
 filter(value: string) {
  return this.clientService.getAllClients()
    .pipe(
      map(response => response.filter(client => {
        return client.clientFirstname.toLowerCase().indexOf(value) >= 0
      }))
    )
}
 getallClients(){
  this.clientService.getAllClients().subscribe(results => {
    if(results){
      this.clients =results;
    }
  });
}
 /**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'Create Project';
		result = `Create Project`;
		return result;
  }
  /**
   * Reset
   */
	reset() {
		this.project = Object.assign({}, this.project);
		this.projectForms();
		this.hasFormErrors = false;
		this.projectForm.markAsPristine();
		this.projectForm.markAsUntouched();
		this.projectForm.updateValueAndValidity();
  }
  /*** Init user*/
	initUser() {
		this.projectForms();
		if (this.project) {
			this.subheaderService.setTitle('Create Project');
			this.subheaderService.setBreadcrumbs([
				{ title: 'Project', page: `/project/project-create` },
				{ title: 'Create project', page: `/project/project-create` },
			]);
			return;
		}
	}
 // form validations
 projectForms(){
 this.projectForm = this.projectFB.group({
   projecttitle: [this.project.projecttitle, Validators.required],
   projectowner: [this.project.projectowner, Validators.required],
   projectrate: [this.project.projectrate, Validators.required],
    location: [this.project.location, Validators.required],
    clientrate: [this.project.clientrate, Validators.required],
    startdate: [this.project.startdate, Validators.required],
    enddate: [this.project.enddate, Validators.required]
   });

}

onSubmit() {
 const controls = this.projectForm.controls;
		/** check form */
		if (this.projectForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}
 const _project : any = new Project();
 _project.clear();
 _project.projecttitle = controls.projecttitle.value;
 _project.projectowner = controls.projectowner.value;
 _project.projectrate = controls.projectrate.value;
 _project.location = controls.location.value;
 _project.clientrate = controls.clientrate.value;
 _project.startdate = controls.startdate.value;
 _project.enddate = controls.enddate.value;
 _project.projecttype = this.myControl.value;
 _project.user_id=this.curentUser.id;
 this.projectservice.saveProject(_project).subscribe(
   response => {
       if (!response.id) {
         // tslint:disable-next-line: no-
         ;
           console.log('project not created');
       }
       const message = `New project successfully has been added.`;
       this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
       this.router.navigate(['../project/project-list']);
   }
)
}
  /*** @param $event: Event
  */
 onAlertClose($event) {
  this.hasFormErrors = false;
}
}
