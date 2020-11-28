import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/core/auth/_services/contract.service';
// Model
import { AuthService, Client, Contract, Employee, Project } from '../../../../core/auth/index';
import { LayoutUtilsService, MessageType } from '../../../../core/_base/crud';
import { SubheaderService } from '../../../../core/_base/layout';
import { ClientDetailsComponent } from '../../client/client-create/steps/client-details/client-details.component';
import { ContractMatStepsComponent } from './contract-mat-steps/contract-mat-steps.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RoleConfig } from '../../../../core/auth/config/role.config';
import { Update } from '@ngrx/entity';
import id from 'src/assets/plugins/formvalidation/src/js/validators/id';
const roles = new RoleConfig().configs;
@Component({
  selector: 'kt-contract-section',
  templateUrl: './contract-section.component.html',
  styleUrls: ['./contract-section.component.scss']
})
export class ContractSectionComponent implements OnInit {
  // creating form group
  contractStepsForm: FormGroup;
  projectForm: FormGroup;
  clientDetailForm:FormGroup;
  employeeForm:FormGroup;
  employeeDetailForm:FormGroup;
  hasFormErrors = false;
  contract:Contract;
  @ViewChild('wizard', { static: true }) el: ElementRef;
  @ViewChild(ContractMatStepsComponent, { static: false })
  ContractmatstepsComponent: ContractMatStepsComponent;
  @ViewChild(ProjectDetailsComponent, { static: false }) ProjectDetailsComponent: ProjectDetailsComponent;
  @ViewChild(ClientDetailsComponent, { static: false }) ClientDetailsComponent: ClientDetailsComponent;
  @ViewChild(EmployeeDetailComponent, { static: false }) EmployeeDetailComponent: EmployeeDetailComponent;
  project: Project;
  controls: any;
  client:Client;
  employee:Employee;
  submitted = false;
  curentUserRoles:any;
  curentUser:any;
  isWizardDisabled=false;
  contactData: any;
  constructor(
    private contractFB: FormBuilder,
    private subheaderService: SubheaderService,
    private layoutUtilsService: LayoutUtilsService,
    private contractService: ContractService,
    private authService : AuthService,
    private router: Router,
    private contractmatStepsComponent:ContractMatStepsComponent,
    private projectdetailsComponent: ProjectDetailsComponent,
    private ClientdetailsComponent:ClientDetailsComponent,
    private EmployeedetailComponent:EmployeeDetailComponent,
    private activatedRoute: ActivatedRoute,
    ) { }
  ngOnInit(): void {
    this.contract = new Contract();
    this.project = new Project();
    this.client = new Client();
    this.employee=new Employee();
    this.initContract();
    this.contractForms();
    this.contractService.apiData$.subscribe(contactData => {
      this.contactData = contactData;
      this.isWizardDisabled=this.contactData;
    });
    this.authService.currentUserRoles().subscribe(
        userRoles => {
          if (userRoles) {
            this.curentUserRoles = userRoles;
          }
        }
      );
      this.authService.currentUser().subscribe(
        user => {
          if (user) {
            this.curentUser = user;
          }
        }
      );
      this.activatedRoute.params.subscribe(params => {
        const id = params.id;
        if (id && id > 0) {
          this.contractService.getContractById(id).subscribe(results => {
            if (results) {
              this.contract = results;
            }
          });
        }
      });
  }
  initContract(){
			this.subheaderService.setTitle('Contract Details');
			this.subheaderService.setBreadcrumbs([
				{ title: 'Contract Details', page: `/contract/contract-create` },
			]);
			return;
  }
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
      startStep: 2
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
  // Form validations
  contractForms(){
    this.contractStepsForm = this.contractFB.group({
      contractForm: this.contractFB.group({
      consultname: [this.contract.consultname, Validators.required],
      jobid: [this.contract.jobid, Validators.required],
      startdate: [{ disabled: true, value: this.contract.startdate }],
      enddate: [{ disabled: true, value: this.contract.enddate }],
      }),
      projectForm: this.contractFB.group({
        id: [this.project.id],
        projecttitle:[this.project.projecttitle, Validators.required],
        projectowner:[this.project.projectowner, Validators.required],
        projectrate: [this.project.projectrate, Validators.required],
        location: [this.project.location, Validators.required],
        clientrate: [this.project.clientrate, Validators.required],
        startdate: [this.project.startdate, Validators.required],
        enddate: [this.project.enddate, Validators.required],
        projecttype: [this.project.projecttype, Validators.required],
      }),
      clientForm: this.contractFB.group({
      id:[this.client.id],
      clientFirstname : [this.client.clientFirstname],
      clientLastname : [this.client.clientLastname],
      clientEmail : [this.client.clientEmail],
    }),
    clientDetailForm: this.contractFB.group({
      clientFirstname : new FormControl({}),
    }),
    employeeDetailForm :this.contractFB.group({
      first_name : new FormControl({}),
    }),
    employeeForm :this.contractFB.group({
      id:[this.employee.id],
      first_name : [this.employee.first_name, Validators.required],
      last_name : [this.employee.last_name, Validators.required],
      email : [this.employee.email, Validators.required],
      phone_number : [this.employee.phone_number, Validators.required],
      birth_date : [this.employee.birth_date, Validators.required],
      gender : [this.employee.gender, Validators.required],
      address : [this.employee.address, Validators.required],
      city : [this.employee.city, Validators.required],
      pincode : [this.employee.pincode, Validators.required],
    })
    });
  }
  reset(){
    this.controls = this.contractStepsForm.controls;
    if (!this.contract.id) {
    this.contractStepsForm.reset();
    this.controls.contractForm.controls.startdate.disable();
    this.controls.contractForm.controls.enddate.disable();
    }
     const wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1
    });
    wizard.goTo(1);
    }
  prepareContract(): Contract{
    this.controls = this.contractStepsForm.controls;
    const _contract : any = new Contract();
    _contract.clear();
    _contract.id = this.contract.id;
    _contract.projectid = this.contract.projectid;
    _contract.clientid = this.contract.clientid;
    _contract.employeeid = this.contract.employeeid;
    _contract.consultname =this.controls.contractForm.controls.consultname.value
    _contract.jobid = this.controls.contractForm.controls.jobid.value;
    _contract.startdate = this.controls.contractForm.controls.startdate.value;
    _contract.enddate = this.controls.contractForm.controls.enddate.value;
    if(_contract!== id){
    _contract.projectid = this.controls.projectForm.controls.id.value
    _contract.clientid = this.controls.clientForm.controls.id.value
    _contract.employeeid = this.controls.employeeForm.controls.id.value
    _contract.user_id=this.curentUser.id;
    }
    if (this.curentUserRoles == 2) {
      _contract.contract_status='Pending';
    }if (this.curentUserRoles == 1) {
      _contract.contract_status='Approved';
    } if ( this.curentUserRoles == 3){
      _contract.contract_status='Pending';
    }
    return _contract;
  }
  onSubmit(withBack: boolean = false){
    this.submitted = true;
    this.hasFormErrors = false;
    const controls =this.contractStepsForm.controls;
     /** check form */
		if (this.contractStepsForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
    }
    const editedContract = this.prepareContract();
		if (editedContract.id > 0) {
			 this.updateContract(editedContract,withBack);
			 return;
		}

		this.addContract(editedContract,withBack);
  }
  addContract(_contract:Contract,withBack: boolean = false){
    this.contractService.saveContract(_contract).subscribe(
      response => {
          if (!response.id) {
            // tslint:disable-next-line: no-
              console.log('Contract not created');
          }
          const message = `New Contract successfully created.`;
          this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
          this.router.navigateByUrl('/contract/contract-list');
      });
  }
  updateContract(_contract:Contract,withBack: boolean = false){
    const updateContract: Update<Client> = {
      id: _contract.id,
      changes: _contract
    };
    this.contractService.updateContract(_contract).subscribe(
      response => {
        if (!response.id) {
          withBack = false;
          const failuremessage = `Contract not updated successfully.`;
          this.layoutUtilsService.showActionNotification(failuremessage, MessageType.Create, 5000, true, true);
        }
        withBack = true;
        const message = `Contract updated successfully.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
      }
    )
  }
  /*** @param $event: Event
*/
	onAlertClose($event) {
		this.hasFormErrors = false;
  }
}
