import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract, Project, ProjectService } from '../../../../../core/auth';
import { ContractService } from '../../../../../core/auth/_services/contract.service';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { ContractSectionComponent } from '../contract-section.component';
import { MatDialog } from '@angular/material/dialog';
import { LoadEntityDialogComponent } from '../../../../partials/content/crud/loading-entity-dialog/loading-entity-dialog.component';
@Component({
  selector: 'kt-contract-filters',
  templateUrl: './contract-filters.component.html',
  styleUrls: ['./contract-filters.component.scss']
})
export class ContractFiltersComponent implements OnInit {
  // Formgroup
  @Input() contractForm: FormGroup;
  contractWizard = false;
  public projectForm;
  project: Project;
  contract: any;
  hasFormErrors = false;
  submitted = false;
  message = false;
  isDisabled = false;
  @Output() isWizardDisabled: boolean;
  startdate = new FormControl(new Date());
  enddate = new FormControl(new Date());
  constructor(private projectService: ProjectService,
    private contractService: ContractService,
    private layoutUtilsService: LayoutUtilsService,
    private projectFB: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ContractsectionComponent: ContractSectionComponent,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.contractService.setData(this.isWizardDisabled);
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-shadowed-variable
      const id = params.id;
      if (id && id > 0) {
        this.contractService.getContractById(id).subscribe(results => {
          if (results) {
            this.contract = results;
            this.isWizardDisabled = true;
            this.contractService.setData(this.isWizardDisabled);
            this.contractForm.controls.consultname.disable();
            this.contractForm.controls.jobid.disable();
            this.contractForm.controls.startdate.enable();
            this.contractForm.controls.enddate.enable();
            this.isDisabled = true;
            this.contractForm.patchValue({
              consultname: this.contract.consultname,
              jobid: this.contract.jobid,
              startdate: this.contract.startdate,
              enddate: this.contract.enddate,
            }),
              this.projectForm.patchValue({
                projecttitle: this.contract.project.project_title,
                projectowner: this.contract.project.project_owner,
                projecttype: this.contract.project.project_type,
                projectrate: this.contract.project.project_rate,
                clientrate: this.contract.project.client_rate,
                location: this.contract.project.project_location,
                startdate: this.contract.project.project_start_date,
                enddate: this.contract.project.project_end_date,
              })
          }
        });
      }
    });
    this.projectForm = this.ContractsectionComponent.contractStepsForm.controls.projectForm;
  }
  contractFilter() {
    this.submitted = true;
    this.hasFormErrors = false;
    const controls = this.contractForm.controls;
    /** check form */
    if (this.contractForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    } else {
      this.contractForm.controls.startdate.enable();
      this.contractForm.controls.enddate.enable();
    }
    const _contract: any = new Contract();
    _contract.clear();
    _contract.jobid = controls.jobid.value;
    this.projectService.getProjectById(_contract.jobid).subscribe(results => {
      this.dialog.open(LoadEntityDialogComponent, {
        width: '250px',
        height: 'auto',
        disableClose: true,
        data: { title: 'Loading...' },
      });
      if (results) {
        this.project = results;
        setTimeout(() => {
          this.projectForm.patchValue({
            id: this.project.id,
            projecttitle: this.project.projecttitle,
            projectowner: this.project.projectowner,
            projecttype: this.project.projecttype,
            projectrate: this.project.projectrate,
            clientrate: this.project.clientrate,
            location: this.project.location,
            startdate: this.project.startdate,
            enddate: this.project.enddate,
          }),
          this.isWizardDisabled = true;
          this.contractService.setData(this.isWizardDisabled);
          this.dialog.closeAll(); // Keep only this row
        }, 1000);
      } else {
        setTimeout(() => {
          this.dialog.closeAll(); // Keep only this row
          this.message = true;
          return;
        }, 200);
        this.projectForm.reset();
        this.contractForm.controls.startdate.disable();
        this.contractForm.controls.enddate.disable();
        this.isWizardDisabled = false;
        this.contractService.setData(this.isWizardDisabled);
      }
    });
  }
  /*** @param $event: Event
*/
  onAlertClose($event) {
    this.message = false;
  }
}
