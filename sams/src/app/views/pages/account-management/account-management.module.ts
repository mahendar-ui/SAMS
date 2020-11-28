// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Translate
import { TranslateModule } from '@ngx-translate/core';
import { PartialsModule } from '../../partials/partials.module';
// Services
import { HttpUtilsService, TypesUtilsService, InterceptService, LayoutUtilsService} from '../../../core/_base/crud';
// Shared
import { ActionNotificationComponent } from '../../partials/content/crud';
// Components
import { AccountManagementComponent } from './account-management.component';
import {AccountCreateComponent} from './account-create/account-create.component';
// Material
import {
	usersReducer,
	UserEffects
} from '../../../core/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
import { AccountViewComponent } from './account-view/account-view.component';
import { AccountListComponent,DialogOverviewExampleDialog } from './account-list/account-list.component';
import { AuthGuard } from '../../../core/auth';
import { RoleConfig } from '../../../core/auth/config/role.config';
import { AccountRejectComponent } from './account-reject/account-reject.component';
const roles = new RoleConfig().configs;
const routes: Routes = [
	{
		path: '',
		component: AccountManagementComponent,
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},
			{
				canActivate: [AuthGuard],
				data:{ role : [roles.roleType.student]},
				path: 'account-create',
				component: AccountCreateComponent
			},
			{
				canActivate: [AuthGuard],
				data:{ role : [roles.roleType.university]},
				path: 'account-view',
				component: AccountViewComponent
			},
			{
				canActivate: [AuthGuard],
				data:{ role : [roles.roleType.student,roles.roleType.bank,
					roles.roleType.university]},
				path: 'account-list',
				component: AccountListComponent
			},
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		PartialsModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([UserEffects]),
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		Ng2TelInputModule,
	],
	providers: [
		InterceptService,
		{
        	provide: HTTP_INTERCEPTORS,
       	 	useClass: InterceptService,
			multi: true
		},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService
	],
	entryComponents: [
		ActionNotificationComponent,
		DialogOverviewExampleDialog,
		AccountRejectComponent
	],
	declarations: [
		AccountManagementComponent,
		AccountCreateComponent,
		AuthNoticeComponent,
		AccountViewComponent,
		AccountListComponent,
		DialogOverviewExampleDialog,
		AccountRejectComponent
	]
})
export class AccountManagementModule {}
