import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
// services
import { ClientService, ProjectService, selectUsersActionLoading } from '../../../../core/auth';
// models
import { Project } from '../../../../core/auth';
import { LoadEntityDialogComponent } from '../../../partials/content/crud/loading-entity-dialog/loading-entity-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SubheaderService } from 'src/app/core/_base/layout';
import { Observable } from 'rxjs';
@Component({
  selector: 'kt-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  project: Project;
  projectForm: FormGroup;
  clients = [];
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  loading$: Observable<boolean>;
  constructor(private projectFB: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private projectService: ProjectService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    public dialog: MatDialog,
    public subheaderService: SubheaderService,
  ) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        switchMap(value => this.filter(value))
      );
    this.loading$ = this.store.pipe(select(selectUsersActionLoading));
    this.projectForm = new FormGroup({
      projecttitle: new FormControl(),
      projecttype: new FormControl(),
      projectowner: new FormControl(),
      projectrate: new FormControl(),
      clientrate: new FormControl(),
      location: new FormControl(),
      startdate: new FormControl(),
      enddate: new FormControl(),
    });
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.projectService.getProjectById(id).pipe(tap(results => {
          if (results) {
            this.project = results;
            this.projectForm.patchValue({
              projecttitle: this.project.projecttitle,
              projectowner: this.project.projectowner,
              projectrate: this.project.projectrate,
              clientrate: this.project.clientrate,
              location: this.project.location,
              startdate: this.project.startdate,
              enddate: this.project.enddate,
              projecttype: this.project.projecttype,
            })
            this.initUser();
            // this.projectForm = this.projectFB.group({
            //   projectDetails : this.projectFB.group({
            //     projecttitle : [this.project.projecttitle],
            //     projectowner : [this.project.projectowner],
            //     projectrate : [this.project.projectrate],
            //     clientrate : [this.project.clientrate],
            //     location : [this.project.location],
            //     startdate : [this.project.startdate],
            //     enddate : [this.project.enddate],
            //   }),
            // });
          }
        }),
        )
          .subscribe();
      } else {
        return;
      }
    })
    this.getallClients();
  }
  // filter with mat auto complete names
  filter(value: string) {
    return this.clientService.getAllClients()
      .pipe(
        map(response => response.filter(client => {
          return client.clientFirstname.toLowerCase().indexOf(value) >= 0
        }))
      )
  }
  getallClients() {
    this.clientService.getAllClients().subscribe(results => {
      if (results) {
        this.clients = results;
      }
    });
  }
  /*** Init user*/
  initUser() {
    this.subheaderService.setTitle('Project Edit');
    this.subheaderService.setBreadcrumbs([
      { title: 'Project', page: `/project/project-create` },
      { title: 'Project Edit', page: `/project/project/edit` },
    ]);
  }
  /*** Returns component title
  */
  getComponentTitle() {
    let result = 'Edit Project';
    result = `Edit Project`;
    return result;
  }
  onSubmit() {
    this.project.projecttitle = this.projectForm.controls.projecttitle.value;
    this.project.projectowner = this.projectForm.controls.projectowner.value;
    this.project.projectrate = this.projectForm.controls.projectrate.value;
    this.project.projecttype = this.myControl.value;
    this.project.clientrate = this.projectForm.controls.clientrate.value;
    this.project.location = this.projectForm.controls.location.value;
    this.project.startdate = this.projectForm.controls.startdate.value;
    this.project.enddate = this.projectForm.controls.enddate.value;
    this.projectService.updateProject(this.project).subscribe(
      results => {
        this.dialog.open(LoadEntityDialogComponent, {
          width: 'auto',
          height: 'auto',
          disableClose: true,
          data: { title: 'Loading...' }
        });
        if (!results) {
          console.log('Project not updated');
        }
        const message = `Project successfully has been updated.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        this.dialog.closeAll();
      }
    )
  }
}
