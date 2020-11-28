import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { InvoiceService } from 'src/app/core/auth/_services/invoice.service';
import { Invoice } from 'src/app/core/auth/_models/invoice.model';

@Component({
  selector: 'kt-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoice: any = [];
     // creating form group
     invoiceForm: FormGroup;
     startDate = new Date(1990, 0, 1);
     minDate = new Date(2000, 0, 1);
     maxDate = new Date(2020, 0, 1);
  constructor(
    private invoiceFB: FormBuilder,
    private layoutUtilsService: LayoutUtilsService,
    private invoiceservice:InvoiceService,) { }

  ngOnInit(): void {
    this.invoice = new Invoice();
    this.invoiceForms();
  }
    // form validations
    invoiceForms(){
      this.invoiceForm = this.invoiceFB.group({
        firstName: [this.invoice.firstName, Validators.required],
        email: [this.invoice.email, Validators.email],
        phoneNumber: [this.invoice.phoneNumber, Validators.required],
        jobId: [this.invoice.jobId, Validators.required],
        date: [this.invoice.date, Validators.required],
        Address: [this.invoice.Address, Validators.required],
        city: [this.invoice.city, Validators.required],
        pinCode: [this.invoice.pinCode, Validators.required],
        });
      }
      onSubmit() {
        const controls = this.invoiceForm.controls;
        const _invoice : any = new Invoice();
        _invoice.clear();
        _invoice.firstName = controls.firstName.value;
        _invoice.email = controls.email.value;
        _invoice.phoneNumber = controls.phoneNumber.value;
        _invoice.jobId = controls.jobId.value;
        _invoice.date = controls.date.value;
        _invoice.Address = controls.Address.value;
        _invoice.city = controls.city.value;
        _invoice.pinCode = controls.pinCode.value;
        this.invoiceservice.saveInvoice(_invoice).subscribe(
          response => {
              if (!response.id) {
                // tslint:disable-next-line: no-
                ;
                  console.log('invoive not created');
              }
              const message = `New invoice successfully has been added.`;
              this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
          }
      )
      }



}
