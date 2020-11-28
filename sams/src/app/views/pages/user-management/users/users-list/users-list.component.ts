import { AfterViewInit, AfterViewChecked } from '@angular/core';
// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';


// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
// LODASH
import { each, find } from 'lodash';
// NGRX
import { Store, select } from '@ngrx/store';

// Services
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { AuthService } from '../../../../../core/auth/_services';

// Models
import {
	User
} from '../../../../../core/auth';
import { QueryParamsModel } from '../../../../../core/_base/crud';
import { SubheaderService } from '../../../../../core/_base/layout';

@Component({
	selector: 'kt-users-list',
	templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {

	dataSource;
	displayedColumns = ['id', 'name','fullname', 'email', 'PhoneNumber','Roles','actions'];
    // user_name:string;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('sort1', { static: true }) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	selection = new SelectionModel<User>(true, []);
	// Subscriptions
	private subscriptions: Subscription[] = [];
 usersList : any;
	/**
	 *
	 * @param calculationService : CalculationService
	 * @param authService : AuthService
	 *  @param activatedRoute: ActivatedRoute
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param router: Router
	 * @param dialog: MatDialog
	 */
	constructor(
		private layoutUtilsService: LayoutUtilsService,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		public dialog: MatDialog,
		private subheaderService: SubheaderService,
	) { }

	ngOnInit() {
		this.loadUsersList();
		this.initUser();
	}
	/**
	 * Returns component title
	 */
	getComponentTitle() {
	}
	/**
	 * Init user
	 */
	initUser() {
	this.subheaderService.setTitle('Users');
	this.subheaderService.setBreadcrumbs([
		{ title: 'User Management', page: `user-management` },
		{ title: 'Users', page: `user-management/users` },
	]);
	return;
	}
	loadUsersList() {
		
		let data = true;
		this.selection.clear();
		// const queryParams = new QueryParamsModel(
		// 	this.sort.direction,
		// 	this.sort.active,
		// );
		// Call request from server
		const entitiesSubscription = this.authService.getAllUsers().subscribe(
			results => {
				if (!results) {
					data = false;
					return;
				}
				this.usersList = results;
				this.dataSource = new MatTableDataSource(this.usersList);
				this.dataSource.paginator = this.paginator;
			}
		)
		this.subscriptions.push(entitiesSubscription);
		this.selection.clear();
	}
	editUser(id) {
		this.router.navigate(['../users/edit', id], { relativeTo: this.activatedRoute });
	}
	deleteUser(_user: User,) {
		const _title = 'User Delete:'+' '+  _user.username;
		const _description = 'Are you sure to permanently delete this User?';
		const _waitDesciption = 'User is deleting...';
		const _deleteMessage = `User has been deleted`;
		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.authService.deleteUser(_user.id).subscribe(
				response => {
					if (!response) {
						return;
					}
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
				}
			)
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.loadUsersList();
			this.getAllUsers();
		});
	}
	getAllUsers(){
		this.authService.getAllUsers().subscribe(results => {
			if (results) {
				this.loadUsersList();
			}
		  });
	}
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}
	fetchUsers() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.fullname}, ${elem.email}`,
				id: elem.id.toString(),
				status: elem.username
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	getItemUserString (role){
		switch (role) {
			case 1:
				return 'Administrator';
			case 2:
				return 'Manager';
			case 3:
				return 'Employee';
		}
		return '';
	}
	applyRoleFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}
