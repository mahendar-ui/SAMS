import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { FileUploadModule } from 'ng2-file-upload';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { HttpClientModule } from '@angular/common/http';
import { ActionNotificationComponent, DeleteEntityDialogComponent } from '../../partials/content/crud';
import { TranslateModule } from '@ngx-translate/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProgressComponent } from './progress/progress.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { PhoneMaskDirective } from './employee-create/phone-mask.directive';
import { EmployeeWizardClickableStepsComponent } from './employee-create/steps/employee-wizard-clickable-steps/employee-wizard-clickable-steps.component';
import { EmployeeDetailsComponent } from './employee-create/steps/employee-details/employee-details.component';
import { EmployeeProfessionalInfoComponent } from './employee-create/steps/employee-professional-info/employee-professional-info.component';
import { EmployeeDocumentsComponent } from './employee-create/steps/employee-documents/employee-documents.component';
import { EmployeeGeneratePasswordComponent } from './employee-create/steps/employee-generate-password/employee-generate-password.component';
const routes: Routes = [
	{
		path: '',
		component: EmployeeComponent,
		children: [
			{
				path: '',
				redirectTo: 'employee',
				pathMatch: 'full'
			},
			{
				path: 'employee-create',
				component: EmployeeCreateComponent
			},
			{
				path: 'employee-list',
				component: EmployeeListComponent
			},
			{
				path: 'employee-create',
				component: EmployeeCreateComponent
			},
			{
				path: 'employee-edit/:id',
				component: EmployeeCreateComponent
			},
			{
				path: 'file-upload',
				component: FileUploadComponent
			},
		]
	}
];

@NgModule({
	providers: [
		EmployeeWizardClickableStepsComponent,
		EmployeeDetailsComponent,
		EmployeeProfessionalInfoComponent,
		EmployeeDocumentsComponent,
		EmployeeGeneratePasswordComponent,
	],
	declarations: [
		EmployeeComponent,
		EmployeeCreateComponent,
		EmployeeListComponent,
		FileUploadComponent,
		ProgressComponent,
		PhoneMaskDirective,
		EmployeeWizardClickableStepsComponent,
		EmployeeDetailsComponent,
		EmployeeProfessionalInfoComponent,
		EmployeeDocumentsComponent,
		EmployeeGeneratePasswordComponent,
	],
	imports: [
		CommonModule,
		CoreModule,
		PartialsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		FormsModule,
		MatButtonModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatChipsModule,
		MatRadioModule,
		MatSelectModule,
		FormsModule,
		MatMenuModule,
		MatTableModule,
		MatAutocompleteModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		PortletModule,
		HttpClientModule,
		TranslateModule.forChild(),
		RouterModule.forChild(routes),
		FileUploadModule,
		Ng2TelInputModule,
	],
	entryComponents: [
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
	],
})
export class EmployeeModule { }
