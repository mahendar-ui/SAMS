import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// service
import {TimesheetService } from '../../../../core/auth';
// model
import {Timesheet} from './../../../../core/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'kt-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
  invoice: Timesheet;
    // creating form group
  invoiceForm: FormGroup;
  invoiceData = false;
  constructor(public dialogRef: MatDialogRef<InvoiceViewComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    private timesheetService: TimesheetService,
    private activatedRoute: ActivatedRoute,
    private invoiceFB: FormBuilder,) { }

  ngOnInit(): void {
    this.invoice = this.data.invoice;
    this.createForm();
  }
  createForm() {
  	this.invoiceForm = this.invoiceFB.group({
			first_name: [this.invoice.invoice_name, Validators.required],
		});
  }
}
