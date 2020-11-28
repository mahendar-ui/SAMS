import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QueryParamsModel, LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SubheaderService, LayoutConfigService } from 'src/app/core/_base/layout';

// Services
import { EmployeeService } from '../../../../core/auth/';
// Models
import { Employee} from '../../../../core/auth/_models/employee.model';

@Component({
  selector: 'kt-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  // Table fields
	dataSource;
  displayedColumns = ['id', 'first_name','last_name', 'email', 'phone_number','PreviousCompany','visa_status','city','actions'];
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild('sort1', {static: true}) sort: MatSort;
	// Filter fields
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  selection = new SelectionModel<Employee>(true, []);


   /**
    * @param activatedRoute: ActivatedRoute
    * @param router: Router
    */

  constructor(
    private employeeService : EmployeeService,
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private layoutUtilsService : LayoutUtilsService,
  private subheaderService: SubheaderService,
	public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadEmployeesList();
    this.initEmployee();
  }
	/* Returns component title
	 */
	getComponentTitle(){
    let result = 'Employee List';
    result = `Employee List`;
    return result;
	}
	/**4vc
	 * Init Employee
	 */
	initEmployee() {
    this.loadEmployeesList();
			this.subheaderService.setTitle('Employee List');
			this.subheaderService.setBreadcrumbs([
        { title: 'Employee', page: `/employee/employee-create` },
				{ title: 'Employee List', page: `/employee/employee-list` },
			]);
			return;
}

  loadEmployeesList() {
		let employeesList;
    // tslint:disable-next-line: no-inferrable-types
    let data: boolean = true;
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
      this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
    );
    // Call request from server
	const entitiesSubscription = this.employeeService.getAllEmployees().subscribe(
			results => {
				if(!results){
          data = false;
					return;
        }
        employeesList = results;
        this.dataSource = new MatTableDataSource(employeesList);
        this.dataSource.paginator = this.paginator;
			}
    )
  }
  filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;
		filter.title = searchText;
		return filter;
  }
  editEmployee(id) {
		this.router.navigate(['../employee-edit', id], { relativeTo: this.activatedRoute });
  }

  deleteEmployee(_employee: Employee) {
		const _title = 'Employee Delete' +':'+' '+ _employee.first_name;
		const _description = 'Are you sure to permanently delete this employee?';
		const _waitDesciption = 'Employee is deleting...';
		const _deleteMessage = `Employee has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
      this.employeeService.deleteEmployee(_employee.id).subscribe(
        response => {
          if(!response){
            return;
          }
          this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
          this.loadEmployeesList();
          this.getAllEmployees();
        }
      )
		});
	}
  getAllEmployees() {
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
