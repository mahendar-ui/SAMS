import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, QueryParamsModel, MessageType } from 'src/app/core/_base/crud';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceviewComponent } from '../invoiceview/invoiceview.component';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
// services
import { TimesheetService } from '../../../../core/auth'
// model
import { Timesheet} from '../../../../core/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoadEntityDialogComponent } from 'src/app/views/partials/content/crud';
import { SubheaderService } from 'src/app/core/_base/layout';
import * as jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'kt-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.scss']
})
export class InvoicelistComponent implements OnInit {
// Table fields
dataSource;
displayedColumns = ['id', 'invoicename','receipt', 'invoiceCreateDate', 'status', 'actions',];
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild('sort1', { static: true }) sort: MatSort;
// Filter fields
@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
// Subscriptions
private subscriptions: Subscription[] = [];
selection = new SelectionModel<Timesheet>(true, []);
filterForm = new FormGroup({
  fromDate: new FormControl(),
  toDate: new FormControl(),
});
constructor(private timesheetservice: TimesheetService,
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private layoutUtilsService: LayoutUtilsService,
  private subheaderService: SubheaderService,
  public dialog: MatDialog,
  private translate: TranslateService,) { }

ngOnInit() {
  this.loadInvoiceList();
  this.initInvoice();
}
loadInvoiceList() {
  this.dialog.open(LoadEntityDialogComponent, {
    width: 'auto',
    height : 'auto',
    disableClose: true,
    data : {title : 'Loading...'}
    });
  let invoicesList;
  // tslint:disable-next-line: no-inferrable-types
  let data: boolean = true;
  this.selection.clear();
  const queryParams = new QueryParamsModel(
    // this.filterConfiguration(),
    this.sort.direction,
    this.sort.active,
  );
  // Call request from server
  const entitiesSubscription = this.timesheetservice.getAllTimesheets().subscribe(
    results => {
      if (!results) {
        data = false;
        return;
      }
      invoicesList = results;
          this.dialog.closeAll();
      this.dataSource = new MatTableDataSource(invoicesList);
      this.dataSource.paginator = this.paginator;
    }
  )
  this.subscriptions.push(entitiesSubscription);
  this.selection.clear();
}
// edit popupmodal invoice
editInvoice(invoice: Timesheet) {
  const dialogRef = this.dialog.open(InvoiceviewComponent, { data: { invoice } });
  dialogRef.afterClosed().subscribe(res => {
    if (!res) {
      return;
    }
    this.loadInvoiceList();
  });
}
viewInvoice(invoice: Timesheet){
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
  pdfMake.createPdf(docDefinition);
  this.timesheetservice.invoicesend(docDefinition).subscribe(
    response => {
      if (!response.id) {
      const message1 = `mail not has been sent.`;
      this.layoutUtilsService.showActionNotification(message1, MessageType.Create, 5000, true, true);
      }
      const message = `mail successfully has been sent.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
    }
  )
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
  }
  dateFilter() {
  this.dataSource.filter = ''+Math.random();
  }
  applyInvoiceFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
	  * Init user
	  */
	initInvoice() {
			this.subheaderService.setTitle('Invoice List');
			this.subheaderService.setBreadcrumbs([
				{ title: 'Invoice', page: `/invoice/invoice-list` },
				{ title: 'Invoice list', page: `/invoice/invoice-list` },
			]);
			return;
	}
}

