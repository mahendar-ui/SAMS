import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientService, Client } from '../../../../../../../app/core/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() clientContactForm: FormGroup;
  @Output() nextSubmit = new EventEmitter<any>();
  @Output() prevSubmit = new EventEmitter<any>();
  client: Client;
  oldClient: Client;
  countryCode: string;
  constructor(private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private clientFB: FormBuilder,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.clientService.getClientById(id).subscribe(results => {
                if(results){
                  this.client = results;
                  this.clientContactForm.patchValue({
                    contactname: this.client.contactname,
                    contactemail: this.client.contactemail,
                    contactphone: this.client.contactphone,
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
    if (this.clientContactForm.invalid) {
      this.clientContactForm.markAllAsTouched();
      return;
    } else {
      this.nextSubmit.next();
      this.clientService.setData(this.clientContactForm);
    }
  }
  // Prev Step
  prevStep() {
    this.prevSubmit.next();
  }
  countryChange(country: any) {
		this.countryCode = '+' + country.dialCode;
	}
}