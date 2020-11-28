import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService, Client } from 'src/app/core/auth';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SubheaderService } from 'src/app/core/_base/layout';

@Component({
  selector: 'kt-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  @Input() clientForm: FormGroup;
  @Output() nextSubmit = new EventEmitter<any>();
  client: Client;
  oldClient: Client;
  constructor(private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private clientFB: FormBuilder,
    private subheaderService: SubheaderService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.clientService.getClientById(id).subscribe(results => {
                if(results){
                  this.client = results;
                  this.clientForm.patchValue({
                    clientFirstname: this.client.clientFirstname,
                    clientLastname: this.client.clientLastname,
                    clientDetails: this.client.clientDetails,
                    clientEmail: this.client.clientEmail,
                  })
                  this.initClient();
                }
            });
      } else {
          this.client = new Client();
          this.client.clear();
        }
    })
  }
  // Next Step
  nextStep() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    } else {
      this.nextSubmit.next();
    }
  }

  initClient() {
  this.subheaderService.setTitle('Edit client');
  this.subheaderService.setBreadcrumbs([
    { title: 'Client',  page: `/client/client-create` },
    { title: 'Edit client', page: `/client/client-create`, queryParams: { id: this.client.id } }
  ]);
  }
}