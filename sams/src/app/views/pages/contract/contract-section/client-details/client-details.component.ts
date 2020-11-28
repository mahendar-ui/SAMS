import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { values } from 'lodash';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs/operators';
// Model
import { Client } from '../../../../../core/auth';
// Services
import { ClientService } from '../../../../../core/auth';
import { ContractService } from '../../../../../core/auth/_services/contract.service';

@Component({
  selector: 'kt-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  // FormGroups
  @Input() clientForm: FormGroup;
  @Input() clientDetailForm: FormGroup;
  // Passing parent to child nextSubmit prevSubmit
  @Output() nextSubmit = new EventEmitter<any>();
  @Output() prevSubmit = new EventEmitter<any>();
  clients = [];
  client: Client;
  clientname: any;
  filteredOptions: Observable<any[]>;
  clientWarn: boolean;
  constructor(private clientService: ClientService,
    private contractService: ContractService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }
  myControl = new FormControl('', [
    Validators.required
  ]);
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        switchMap(value => this.filter(value))
      );
    this.clientForm.controls.clientFirstname.disable();
    this.clientForm.controls.clientLastname.disable();
    this.clientForm.controls.clientEmail.disable();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.contractService.getContractById(id).subscribe(results => {
          if (results) {
            this.clientname = results;
            this.clientForm.patchValue({
              clientFirstname: this.clientname.client.client_firstname,
              clientLastname: this.clientname.client.client_lastname,
              clientEmail: this.clientname.client.client_email,
            }),
              this.clientDetailForm.controls.clientFirstname.disable();
            this.clientDetailForm.patchValue({
              clientFirstname: this.clientname.client.client_firstname,
            })
          }
        });
      }
    });
    this.getallClients();
    this.clientDetailForm = new FormGroup({
      clientFirstname: new FormControl('', {}),
    })
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
  getallClients() {
    this.clientService.getAllClients().subscribe(results => {
      if (results) {
        this.clients = results;
      }
    });
  }
  applyclientFilter(event) {
    const id = event.id;
    this.clientService.getClientById(id).subscribe(results => {
      if (results) {
        this.client = results;
        this.clientForm.patchValue({
          id: this.client.id,
          clientFirstname: this.client.clientFirstname,
          clientLastname: this.client.clientLastname,
          clientEmail: this.client.clientEmail,
        })
      }
    });
  }
  displayFn(client) {
    if (client && client.clientFirstname) {
      return client.clientFirstname.toLowerCase();
    } else {
      return client
    }
  }
  // Next Step
  nextStep() {
    if (this.myControl.value == '' && this.clientDetailForm.value.clientFirstname == '') {
      this.myControl.markAllAsTouched();
      this.clientWarn = true;
      return;
    } else {
      this.nextSubmit.next();
    }
  }
  // Prev Step
  prevStep() {
    this.prevSubmit.next();
  }
  /*** @param $event: Event
  */
  onAlertClose($event) {
    this.clientWarn = false;
  }
}