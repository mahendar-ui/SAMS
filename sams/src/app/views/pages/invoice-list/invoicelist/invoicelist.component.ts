import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, QueryParamsModel, MessageType } from 'src/app/core/_base/crud';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
// services
import { TimesheetService } from '../../../../core/auth'
// model
import { Timesheet} from '../../../../core/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoadEntityDialogComponent } from 'src/app/views/partials/content/crud';
@Component({
	selector: 'kt-invoicelist',
	templateUrl: './invoicelist.component.html',
	styleUrls: ['./invoicelist.component.scss']
})
export class InvoicelistComponent implements OnInit {
	// Table fields
	dataSource;
	displayedColumns = ['id', 'invoicename', 'invoiceCreateDate', 'status', 'actions',];
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
		public dialog: MatDialog,
		private translate: TranslateService,) { }

	ngOnInit() {
		this.loadInvoiceList();
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
		const dialogRef = this.dialog.open(InvoiceViewComponent, { data: { invoice } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.loadInvoiceList();
		});
	}
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	  }
	  dateFilter() {
		this.dataSource.filter = ''+Math.random();
	  }
}
