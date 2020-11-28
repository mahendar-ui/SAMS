import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// service
import {TimesheetService } from '../../../../core/auth';
// model
import {Timesheet} from './../../../../core/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'kt-invoiceview',
  templateUrl: './invoiceview.component.html',
  styleUrls: ['./invoiceview.component.scss']
})
export class InvoiceviewComponent implements OnInit {

  invoice: Timesheet;
    // creating form group
  invoiceForm: FormGroup;
  invoiceData = false;
  constructor(public dialogRef: MatDialogRef<InvoiceviewComponent>,
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
  invoicePrint() {
		window.print();
  }
  public downloadPDF( invoice): void {

    let docDefinition = {
      content: [
        { text: 'Invoice', style: 'header' },
        { text: 'Invoice', style: 'rightHeader' },
        { text: '10 Downing Street', style: 'rightHeader' },
        { text: 'Westwood Heath, CV4 9ZU', style: 'rightHeader' },
        { text: '7702532025', style: 'rightHeader' },
        { text: 'nishith@gmail.com', style: 'rightHeader' },
        { text: invoice.invoice_name, style: ['leftHeader'] },
        { text: '10 Downing Street', style: ['leftHeader'] },
        { text: 'Westwood Heath, CV4 9ZU', style: ['leftHeader'] },
        { text: '7702532025', style: ['leftHeader'] },
        { text: 'Invoice Receipt: #1596', style: ['leftHeader'] },
        { text: invoice.invoice_created_date, style: ['leftHeader'] },
        { text: 'INVOICE', style: ['invoiceStructure'] },
        {
          style: 'tableExample',
          table: {
            widths: [150, '*', '*', 140],
            body: [
              [
                // tslint:disable-next-line: max-line-length
                { text: 'Description', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff'}, 
                { text: 'Hours', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff'}, 
                { text: 'Rate', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff'}, 
                { text: 'Amount', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff'}
              ],
              [
                { text: 'Creative Design', fillOpacity: 0.15 },
                { text: '80', fillOpacity: 0.60 },
                { text: '$40.00', fillOpacity: 0.85 },
                { text: '$3200.00', fillOpacity: 0.85 },
              ],
              [
                { text: 'Front-End Development', fillOpacity: 0.15 },
                { text: '100', fillOpacity: 0.60 },
                { text: '$60.00', fillOpacity: 0.85 },
                { text: '$3800.00', fillOpacity: 0.85 },
              ],
              [
                { text: 'Back-End Development	', fillOpacity: 0.15 },
                { text: '100', fillOpacity: 0.60 },
                { text: '$80.00', fillOpacity: 0.85 },
                { text: '$4200.00', fillOpacity: 0.85 },
              ],
            ]
          },
        },
        { text: 'BANK TRANSFER', style: ['costSummary'] },
        {
          style: 'tableExample',
          table: {
            widths: [150, '*', '*', 140],
            body: [
              [
                // tslint:disable-next-line: max-line-length
                { text: 'Account Name', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff' },
                // tslint:disable-next-line: max-line-length
                { text: 'Account Number', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff' },
                { text: 'Code', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff' },
              ],
              [
                { text: invoice.invoice_name, fillOpacity: 0.15 },
                { text: '12378769768065', fillOpacity: 0.60 },
                { text: 'BARC0032UK', fillOpacity: 0.60 },
              ],
            ]
          },
        },
        { text: 'Grand Total', style: ['costSummary'] },
        {
          style: 'tableExample',
          table: {
            widths: [120, '*', '*', '*', '*'],
            body: [
              [
                // tslint:disable-next-line: max-line-length
                { text: 'Sub Total', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff' },
                // tslint:disable-next-line: max-line-length
                { text: 'Taxes', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff' },
                // tslint:disable-next-line: max-line-length
                { text: 'Grand Total', style: 'tableHeader', border: [true, true, true, true], fillOpacity: 0.85, fillColor: '#3699FF', color: '#ffffff' },
              ],
              [
                { text: '$63800.00', fillOpacity: 0.15 },
                { text: '$15.00', fillOpacity: 0.60 },
                { text: '$639115.00', fillOpacity: 0.60 },
              ],
            ]
          },
        },
        { text: 'TOTAL COST', style: ['costSummary'] },
        { text: 'GrandTotal : $639115.00', style: ['ktQuotePara'] },
        { text: 'Thank you',
        style: ['ktQuoteExtraPara'] },

      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          color: '#3699FF',
        },
        rightHeader: {
          italics: false,
          alignment: 'right',
          fontSize: 12,
          bold: false,
          lineHeight: 1.5,
        },
        leftHeader: {
          italics: false,
          alignment: 'left',
          fontSize: 12,
          bold: false,
          lineHeight: 1.5,
        },
        invoiceStructure: {
          color: '#585858',
          fontSize: 14,
          margin: [0, 2, 10, 10],
        },
        costSummary :{
          color: '#585858',
          fontSize: 14,
          margin: [0, 15, 15, 15],
        },
        cleaningSpeification: {
          color: '#585858',
          fontSize: 14,
          margin: [0, 20, 10, 10],
        },
        kitchenQuotation: {
          margin: [0, 20, 0, 0],
        },
        ktQuoteExtraPara: {
          color: '#3699FF',
          margin: [0, 10, 10, 10],
        },

      }
    };
    // pdfMake.createPdf(docDefinition).open();
    pdfMake.createPdf(docDefinition).download('invoice.pdf');
  }
}
