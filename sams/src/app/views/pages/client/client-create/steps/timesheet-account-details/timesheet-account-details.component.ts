import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService, Client } from 'src/app/core/auth';

@Component({
  selector: 'kt-timesheet-account-details',
  templateUrl: './timesheet-account-details.component.html',
  styleUrls: ['./timesheet-account-details.component.scss']
})
export class TimesheetAccountDetailsComponent implements OnInit {
  @Input() timesheetAccountForm: FormGroup;
  @Output() prevSubmit = new EventEmitter<any>();
  client:Client;
  timesheetData: any;
  countryCode: string;
  constructor( private activatedRoute: ActivatedRoute,
    public clientService:ClientService,
    private timesheetfb: FormBuilder,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.clientService.getClientById(id).subscribe(results => {
                if(results){
                  this.client = results;
                  this.timesheetAccountForm.patchValue({
                    timesheetFirstname: this.client.timesheetFirstname,
                    timesheetEmail: this.client.timesheetEmail,
                    timesheetPhonenumber: this.client.timesheetPhonenumber,
                  })
                }
            })
      } else {
          this.client = new Client();
          this.client.clear();
        }
    })
  }
// Prev Step
prevStep() {
  this.prevSubmit.next();
 }
 onSubmit() {
  if (this.timesheetAccountForm.invalid) {
    this.timesheetAccountForm.markAllAsTouched();
    return;
  } else {
  }
}
// Change supervisor details
changeTimesheetDetails(event) {
  if (event.checked){
  this.timesheetAccountForm.controls['timesheetFirstname'].disable();
  this.timesheetAccountForm.controls['timesheetEmail'].disable();
  this.timesheetAccountForm.controls['timesheetPhonenumber'].disable();
  this.clientService.apiData$.subscribe(timesheetData => {
    this.timesheetData = timesheetData;
    this.timesheetAccountForm.patchValue({
      timesheetFirstname: this.timesheetData.controls.supervisorFirstname.value,
      timesheetEmail: this.timesheetData.controls.supervisorEmail.value,
      timesheetPhonenumber: this.timesheetData.controls.supervisorPhonenumber.value,
    })
  })
}else{
  this.activatedRoute.params.subscribe(params => {
    const id = params.id;
    this.timesheetAccountForm.controls['timesheetFirstname'].enable();
    this.timesheetAccountForm.controls['timesheetEmail'].enable();
    this.timesheetAccountForm.controls['timesheetPhonenumber'].enable();
    if (id && id > 0) {
      this.clientService.getClientById(id).subscribe(results => {
              if(results){
                this.client = results;
                this.timesheetAccountForm.patchValue({
                  timesheetFirstname: this.client.timesheetFirstname,
                  timesheetEmail: this.client.timesheetEmail,
                  timesheetPhonenumber: this.client.timesheetPhonenumber,
                })
              }
          })
    } else {
        this.client = new Client();
        this.timesheetAccountForm.reset();
        this.timesheetAccountForm.controls['timesheetFirstname'].enable();
        this.timesheetAccountForm.controls['timesheetEmail'].enable();
        this.timesheetAccountForm.controls['timesheetPhonenumber'].enable();
      }
  })
}
}
countryChange(country: any) {
  this.countryCode = '+' + country.dialCode;
}
}
