import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Project, ProjectService } from 'src/app/core/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, QueryParamsModel, MessageType } from 'src/app/core/_base/crud';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LoadEntityDialogComponent } from '../../../partials/content/crud/loading-entity-dialog/loading-entity-dialog.component';
import { Subscription } from 'rxjs';
import { SubheaderService } from 'src/app/core/_base/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'kt-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  // Table fields
  dataSource= new MatTableDataSource<Project>();
  displayedColumns = ['id', 'projectTitle', 'projectOwner', 'rate', 'clientrate','startdate','enddate','clienttype','actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  // Subscriptions
  private subscriptions: Subscription[] = [];
  pipe: DatePipe;
  project:Project;
  selection = new SelectionModel<Project>(true, []);
  get fromDate() { return this.filterForm.get('fromDate').value; }
get toDate() { return this.filterForm.get('toDate').value; }
  constructor(private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private subheaderService: SubheaderService,
    public dialog: MatDialog,) { this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (project, filter) =>{
      if (this.fromDate && this.toDate) {
        return project.startdate >= this.fromDate && project.startdate <= this.toDate;
      }
      return true;
    } }
    filterForm = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl(),
    });
  ngOnInit() {
    this.loadProjectsList();
    this.dialog.open(LoadEntityDialogComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: { title: 'Project List Loading...' }
    });
  }
  /**
   * Returns component title
   */
  getComponentTitle() {
    let result = 'Project List';
    result = `Project List`;
    return result;
  }

  loadProjectsList() {
    this.subheaderService.setTitle('Project List');
    this.subheaderService.setBreadcrumbs([
      { title: 'Project', page: `/project/project-create` },
      { title: 'project list', page: `/project/project-list` },
    ]);
    let projectsList;
    // tslint:disable-next-line: no-inferrable-types
    let data: boolean = true;
    this.selection.clear();
    const queryParams = new QueryParamsModel(
      // this.filterConfiguration(),
      this.sort.direction,
      this.sort.active,
    );
    // Call request from server
    const entitiesSubscription = this.projectService.getAllProjects().subscribe(
      results => {
        if (!results) {
          data = false;
          return;
        }
        projectsList = results;
        this.dialog.closeAll();
        this.dataSource = new MatTableDataSource(projectsList);
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  // filterConfiguration(): any {
  // 	const filter: any = {};
  // 	const searchText: string = this.searchInput.nativeElement.value;
  // 	filter.title = searchText;
  // 	return filter;
  // }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  editProject(id) {
    this.dialog.open(LoadEntityDialogComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: { title: 'Loading...' }
    });
    this.router.navigate(['../project/edit', id], { relativeTo: this.activatedRoute });
    this.dialog.closeAll();
  }

  deletProject(_project: Project) {
    const _title = 'Project Delete:' +' ' + _project.projectowner;
    const _description = 'Are you sure to permanently delete this project?';
    const _waitDesciption = 'Project is deleting...';
    const _deleteMessage = `Project has been deleted`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.projectService.deleteProject(_project.id).subscribe(
        response => {
          if (!response) {
            return;
          }
          this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
          this.loadProjectsList();
          this.getAllProjects();
        }
      )
    });
  }
  getAllProjects() {
  }
  applyDateFilter(filterValue: string){
    this.dataSource.filter = filterValue;
  }
  applyClientFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
