// Angular
import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'error-entity-dialog',
	templateUrl: './error-entity-dialog.component.html',
	styleUrls: ['./error-entity-dialog.scss']
})
export class ErrorEntityDialogComponent implements OnInit {
	// Public properties
	viewLoading = false;
	errorCode : number;
	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
	 * @param data: any
	 */
	constructor(
		private router : Router,
		public dialogRef: MatDialogRef<ErrorEntityDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.errorCode = this.data.errorCode;
	}

	/**
	 * Close dialog with false result
	 */
	onNoClick(): void {
		this.dialogRef.close();
	}

	/**
	 * Close dialog with true result
	 */
	onYesClick(): void {
		this.viewLoading = true;
		this.dialogRef.close();
		if(this.errorCode === 422){
			window.location.reload();
		}else{
			localStorage.clear();
			this.router.navigateByUrl('/auth/login')
		}
	}
}
