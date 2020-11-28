import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, Client, ClientService } from 'src/app/core/auth';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { SubheaderService, LayoutConfigService } from 'src/app/core/_base/layout';
import { ClientWizardClickableStepsComponent } from './steps/client-wizard-clickable-steps/client-wizard-clickable-steps.component';
import { ClientDetailsComponent } from './steps/client-details/client-details.component';
import { SupervisorDetailsComponent } from './steps/supervisor-details/supervisor-details.component';
import { TimesheetAccountDetailsComponent } from './steps/timesheet-account-details/timesheet-account-details.component';
import { ContactDetailsComponent } from './steps/contact-details/contact-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Update } from '@ngrx/entity';
@Component({
  selector: 'kt-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {


  client: Client;
  // creating form group
  ClientWizardForm: FormGroup;
  clientForm: FormGroup;
  clientContactForm: FormGroup;
  supervisorDetailsForm:FormGroup;
  timesheetAccountForm:FormGroup;
  hasFormErrors = false;
  curentUser:any;
  @ViewChild('wizard', { static: true }) el: ElementRef;
  isEdit = false;
  @ViewChild(ClientWizardClickableStepsComponent, { static: false })
  clientWizardClickableStepsComponent: ClientWizardClickableStepsComponent;
  @ViewChild(ClientDetailsComponent, { static: false }) clientDetailsComponent: ClientDetailsComponent;
  @ViewChild(ContactDetailsComponent, { static: false }) contactDetailsComponent: ContactDetailsComponent;
  @ViewChild(SupervisorDetailsComponent, { static: false }) supervisorDetailsComponent: SupervisorDetailsComponent;
  @ViewChild(TimesheetAccountDetailsComponent, { static: true }) timesheetAccountDetailsComponent: TimesheetAccountDetailsComponent;
  submitted = false;
  controls: any;
  countryCode: any;
  /*** component constructor
  * @param clientFB : FormBuilder
  */

  constructor(
    private clientFB: FormBuilder,
    private layoutUtilsService: LayoutUtilsService,
    private clientService: ClientService,
    private subheaderService: SubheaderService,
    private authService : AuthService,
    private clientWizardclickableStepsComponent:ClientWizardClickableStepsComponent,
    private clientdetailsComponent: ClientDetailsComponent,
    private dontactdetailsComponent:ContactDetailsComponent,
    private supervisordetailsComponent:SupervisorDetailsComponent,
    private timesheetaccountDetailsComponent:TimesheetAccountDetailsComponent,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.client = new Client();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.clientService.getClientById(id).subscribe(results => {
                if(results){
                  this.client = results;
                }
            });
      } else {
          this.client = new Client();
          this.client.clear();
        }
    })
    this.clientForms();
    this.initClient();
    this.authService.currentUser().subscribe(
      user => {
        if (user) {
          this.curentUser = user;
        }
      }
    );
  }

  /* Returns component title
 */
  getComponentTitle() {
    if (!this.client.id) {
    let result = 'Create Client';
    result = `Create client`;
    return result;
    }else{
      let result = 'Edit Client';
      result = `Edit client`;
    return result;
    }
  }
  /**4vc
   * Init Employee
   */
  initClient() {
    this.clientForms();
    if (!this.client.id) {
    this.subheaderService.setTitle('Create client');
    this.subheaderService.setBreadcrumbs([
      { title: 'Client', page: `/client/client-create` },
      { title: 'Create client', page: `/client/client-create` },
    ]);
    return;
  }
  this.subheaderService.setTitle('Edit Client');
  this.subheaderService.setBreadcrumbs([
    { title: 'Client',  page: `client` },
    { title: 'Edit client', page: `client/edit`, queryParams: { id: this.client.id } }
  ]);
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
  // form validations
  clientForms() {
    this.ClientWizardForm = this.clientFB.group({
      clientForm: this.clientFB.group({
        clientFirstname: [this.client.clientFirstname, Validators.required],
        clientLastname: [this.client.clientLastname, Validators.required],
        clientEmail: [this.client.clientEmail, Validators.email],
        clientDetails: [this.client.clientDetails, Validators.required],
      }),
      clientContactForm: this.clientFB.group({
        contactname: [this.client.contactname, Validators.required],
        contactemail: [this.client.contactemail,Validators.email],
        contactphone: [this.client.contactphone, Validators.required],
      }),
      supervisorDetailsForm: this.clientFB.group({
        supervisorFirstname: [this.client.supervisorFirstname, Validators.required],
        supervisorPhonenumber: [this.client.supervisorPhonenumber, Validators.required],
        supervisorEmail: [this.client.supervisorEmail, Validators.email],
      }),
      timesheetAccountForm: this.clientFB.group({
        timesheetFirstname: [this.client.timesheetFirstname, Validators.required],
        timesheetPhonenumber: [this.client.timesheetPhonenumber, Validators.required],
        timesheetEmail: [this.client.timesheetEmail, Validators.email],
      }),
    });
  }

  clientWizardFormSubmit(withBack: boolean = false) {
    this.submitted = true;
    this.hasFormErrors = false;
    const controls =this.ClientWizardForm.controls;
    /** check form */
		if (this.ClientWizardForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
    }
    const editedClient = this.prepareClient();

		if (editedClient.id > 0) {
			 this.updateClient(editedClient, withBack);
			 return;
		}

		this.addClient(editedClient, withBack);
  }
/** * Returns prepared data for save */
prepareClient():Client {
  this.controls = this.ClientWizardForm.controls;
  const _client: any = new Client();
  _client.clear();
  _client.id = this.client.id;
  _client.clientFirstname =  this.controls.clientForm.controls.clientFirstname.value;
  _client.clientLastname = this.controls.clientForm.controls.clientLastname.value;
  _client.clientEmail = this.controls.clientForm.controls.clientEmail.value;
  _client.clientDetails = this.controls.clientForm.controls.clientDetails.value;
  _client.contactname = this.controls.clientContactForm.controls.contactname.value;
  _client.contactemail = this.controls.clientContactForm.controls.contactemail.value;
  if(this.contactDetailsComponent.countryCode == undefined){
    _client.contactphone =  this.controls.clientContactForm.controls.contactphone.value;
  }else{
  _client.contactphone = this.contactDetailsComponent.countryCode + this.controls.clientContactForm.controls.contactphone.value;
  }
  _client.supervisorFirstname = this.controls.supervisorDetailsForm.controls.supervisorFirstname.value;
  if(this.supervisordetailsComponent.countryCode == undefined){
  _client.supervisorPhonenumber = this.controls.supervisorDetailsForm.controls.supervisorPhonenumber.value;
  }else{
  _client.supervisorPhonenumber = this.supervisordetailsComponent.countryCode +
  this.controls.supervisorDetailsForm.controls.supervisorPhonenumber.value;
  }
  _client.supervisorEmail = this.controls.supervisorDetailsForm.controls.supervisorEmail.value;
  _client.timesheetFirstname = this.controls.timesheetAccountForm.controls.timesheetFirstname.value;
  if(this.timesheetAccountDetailsComponent.countryCode == undefined){
    _client.timesheetPhonenumber = this.controls.timesheetAccountForm.controls.timesheetPhonenumber.value;
  }else{
  _client.timesheetPhonenumber = this.timesheetAccountDetailsComponent.countryCode +
  this.controls.timesheetAccountForm.controls.timesheetPhonenumber.value;
  }
  _client.timesheetEmail = this.controls.timesheetAccountForm.controls.timesheetEmail.value;
  _client.user_id=this.curentUser.id;
  return _client;
}
addClient(_client:Client, withBack: boolean = false){
  this.clientService.saveClient(_client).subscribe(
    response => {
      if (!response.id) {
        // tslint:disable-next-line: no-
        ;
        console.log('client not created');
      }
      withBack = true;
      const message = `New client successfully has been added.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
      if (withBack) {
        this.goBackWithoutId();
      }
    }
  )
}
updateClient(_client:Client, withBack: boolean = false){
  const updateClient: Update<Client> = {
    id: _client.id,
    changes: _client
  };
  this.clientService.updateClient(_client).subscribe(
    response => {
      if (!response.id) {
        // tslint:disable-next-line: no-
        ;
        console.log('client not updated');
      }
      withBack = true;
      const message = `client updated successfully.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
    }
  )
}
  /*** Close alert* @param $event*/
	onAlertClose($event) {
		this.hasFormErrors = false;
  }
  goBackWithoutId() {
		this.router.navigateByUrl('/client/client-list', { relativeTo: this.activatedRoute });
  }
  reset(){
    this.client = Object.assign({}, this.client);
		this.clientForms();
		this.hasFormErrors = false;
		this.ClientWizardForm.markAsPristine();
		this.ClientWizardForm.markAsUntouched();
    this.ClientWizardForm.updateValueAndValidity();
    const wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1
    });
    wizard.goTo(1);
  }
}
