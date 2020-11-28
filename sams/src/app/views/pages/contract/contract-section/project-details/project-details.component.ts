import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ClientService, Project, ProjectService } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';

@Component({
  selector: 'kt-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectForm: FormGroup;
  @Output() nextSubmit = new EventEmitter<any>();
  startdate = new FormControl(new Date());
  enddate = new FormControl(new Date());
  project: Project;
  clients: any;
  constructor(private router: Router,
    private store: Store<AppState>,
    private projectService: ProjectService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.projectForm.controls.projecttitle.disable();
    this.projectForm.controls.projectowner.disable();
    this.projectForm.controls.projecttype.disable();
    this.projectForm.controls.projectrate.disable();
    this.projectForm.controls.clientrate.disable();
    this.projectForm.controls.location.disable();
    this.projectForm.controls.startdate.disable();
    this.projectForm.controls.enddate.disable();
  }
  // Next Step
  nextStep() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    } else {
      this.nextSubmit.next();
    }
  }

}
