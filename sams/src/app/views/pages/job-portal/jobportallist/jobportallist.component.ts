import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
// model
import { JobPortal, JobportalService } from '../../../../core/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, QueryParamsModel, MessageType } from 'src/app/core/_base/crud';
import { MatDialog } from '@angular/material/dialog';
import { LoadEntityDialogComponent } from 'src/app/views/partials/content/crud';
import { MatTableDataSource } from '@angular/material/table';
import { SubheaderService } from 'src/app/core/_base/layout';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kt-jobportallist',
  templateUrl: './jobportallist.component.html',
  styleUrls: ['./jobportallist.component.scss']
})
export class JobportallistComponent implements OnInit {
 // Table fields
 dataSource;
 jobPortalForm: FormGroup;
 displayedColumns = ['id', 'jobTitle', 'companyname','address','startdate','enddate', 'jobtype','actions'];
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild('sort1', {static: true}) sort: MatSort;
	// Filter fields
 @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
	// Subscriptions
private subscriptions: Subscription[] = [];
selection = new SelectionModel<JobPortal>(true, []);
  constructor(private jobportalservice : JobportalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private layoutUtilsService : LayoutUtilsService,
    private subheaderService: SubheaderService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.jobPortalForm = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl(),
    });
    this.loadJobPortalsList();
    this.jobbreadcrumb();
    this.dialog.open(LoadEntityDialogComponent, {
      width: 'auto',
      height : 'auto',
      disableClose: true,
      data : {title : 'Jobportal List Loading...'}
      });
  }
  loadJobPortalsList (){
    let jobportalList;
    // tslint:disable-next-line: no-inferrable-types
    let data: boolean = true;
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			// this.filterConfiguration(),
			this.sort.direction,
      this.sort.active,
    );
      // Call request from server
	const entitiesSubscription = this.jobportalservice.getAllJobPortals().subscribe(
    results => {
      if(!results){
        data = false;
        return;
      }
      jobportalList = results;
      this.dialog.closeAll();
      this.dataSource = new MatTableDataSource(jobportalList);
      this.dataSource.paginator = this.paginator;
    }
  )
}
jobbreadcrumb() {
  this.subheaderService.setTitle('Jobportal List');
  this.subheaderService.setBreadcrumbs([
    { title: 'Jobportal', page: `/job-portal/job-portal-create` },
    { title: 'Jobportal List', page: `/job-portal/jobportal-list` },
  ]);
  return;
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}
downloadDocFile(api: string, file: string) {

}

editJobPortal(id) {
  this.dialog.open(LoadEntityDialogComponent, {
    width: 'auto',
    height : 'auto',
    disableClose: true,
    data : {title : 'Loading...'}
    });
  this.router.navigate(['../jobportal/edit', id], { relativeTo: this.activatedRoute });
  this.dialog.closeAll();
}

deletJobPortal(_jobportal: JobPortal) {
  const _title = 'jobportal Delete';
  const _description = 'Are you sure to permanently delete this jobportal?';
  const _waitDesciption = 'jobportal is deleting...';
  const _deleteMessage = `jobportal has been deleted`;

  const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
  dialogRef.afterClosed().subscribe(res => {
    if (!res) {
      return;
    }
    this.jobportalservice.deleteJobPortal(_jobportal.id).subscribe(
      response => {
        if(!response){
          return;
        }
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
        this.loadJobPortalsList();
      }
    )
  });
}
applyJobFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
