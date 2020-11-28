import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ClientService, Client } from 'src/app/core/auth';
import { result } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-supervisor-details',
  templateUrl: './supervisor-details.component.html',
  styleUrls: ['./supervisor-details.component.scss']
})
export class SupervisorDetailsComponent implements OnInit {
  client:Client;
  // supervisorDetails:any;
  @Input() supervisorDetailsForm: FormGroup;
  @Output() nextSubmit = new EventEmitter<any>();
  @Output() prevSubmit = new EventEmitter<any>();
  contactData: any;
  countryCode: string;
  constructor(public clientService:ClientService,
    private supervisorfb: FormBuilder,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.clientService.getClientById(id).subscribe(results => {
                if(results){
                  this.client = results;
                  this.supervisorDetailsForm.patchValue({
                    supervisorFirstname: this.client.supervisorFirstname,
                    supervisorEmail: this.client.supervisorEmail,
                    supervisorPhonenumber: this.client.supervisorPhonenumber,
                  })
                }
            })
      } else {
          this.client = new Client();
          this.client.clear();
        }
    })
  }
// Next Step
nextStep() {
  if (this.supervisorDetailsForm.invalid) {
    this.supervisorDetailsForm.markAllAsTouched();
    return;
  } else {
    this.nextSubmit.next();
    this.clientService.setData(this.supervisorDetailsForm);
  }
}
// Prev Step
prevStep() {
  this.prevSubmit.next();
 }

 // Change supervisor details
 changeSupervisorDetails(event) {
  if(event.checked){
  this.supervisorDetailsForm.controls['supervisorFirstname'].disable();
  this.supervisorDetailsForm.controls['supervisorEmail'].disable();
  this.supervisorDetailsForm.controls['supervisorPhonenumber'].disable();
  this.clientService.apiData$.subscribe(contactData => {
  this.contactData = contactData;
    this.supervisorDetailsForm.patchValue({
      supervisorFirstname: this.contactData.controls.contactname.value,
      supervisorEmail: this.contactData.controls.contactemail.value,
      supervisorPhonenumber: this.contactData.controls.contactphone.value,
    })
  })
  }else{
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.supervisorDetailsForm.controls['supervisorFirstname'].enable();
      this.supervisorDetailsForm.controls['supervisorEmail'].enable();
      this.supervisorDetailsForm.controls['supervisorPhonenumber'].enable();
      if (id && id > 0) {
        this.clientService.getClientById(id).subscribe(results => {
                if(results){
                  this.client = results;
                  this.supervisorDetailsForm.patchValue({
                    supervisorFirstname: this.client.supervisorFirstname,
                    supervisorEmail: this.client.supervisorEmail,
                    supervisorPhonenumber: this.client.supervisorPhonenumber,
                  })
                }
            })
      } else {
          this.client = new Client();
          this.supervisorDetailsForm.reset();
          this.supervisorDetailsForm.controls['supervisorFirstname'].enable();
          this.supervisorDetailsForm.controls['supervisorEmail'].enable();
          this.supervisorDetailsForm.controls['supervisorPhonenumber'].enable();
        }
    })
  }
}
countryChange(country: any) {
  this.countryCode = '+' + country.dialCode;
}
}
