import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


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
import { ClientComponent } from './client.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { CodePreviewModule } from '../../partials/content/general/code-preview/code-preview.module';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { LoadEntityDialogComponent } from '../../partials/content/crud';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientWizardClickableStepsComponent } from './client-create/steps/client-wizard-clickable-steps/client-wizard-clickable-steps.component';
import { ClientDetailsComponent } from './client-create/steps/client-details/client-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContactDetailsComponent } from './client-create/steps/contact-details/contact-details.component';
import { SupervisorDetailsComponent } from './client-create/steps/supervisor-details/supervisor-details.component';
import { TimesheetAccountDetailsComponent } from './client-create/steps/timesheet-account-details/timesheet-account-details.component';
import { ClientListComponent } from './client-list/client-list.component';
import { PhoneMaskDirective } from './client-create/phone-mask.directive';
import { Ng2TelInputModule } from 'ng2-tel-input';

const routes: Routes = [
	{
		path: '',
		component: ClientComponent,
		children: [
			{
				path: '',
				redirectTo: 'client',
				pathMatch: 'full'
			},
			{
				path: 'client-create',
				component: ClientCreateComponent
			},
			{
				path: 'client-list',
				component: ClientListComponent
			},
			{
				path: 'client-create',
				component: ClientCreateComponent
			},
			{
				path: 'client-create/:id',
				component: ClientCreateComponent
			},
		]
	}
];

@NgModule({
	providers: [
		ClientWizardClickableStepsComponent,
		ClientDetailsComponent,
		ContactDetailsComponent,
		SupervisorDetailsComponent,
		TimesheetAccountDetailsComponent,
	],
	declarations: [
		ClientComponent,
		ClientEditComponent,
		ClientDetailsComponent,
		ClientWizardClickableStepsComponent,
		ClientCreateComponent,
		ContactDetailsComponent,
		SupervisorDetailsComponent,
		TimesheetAccountDetailsComponent,
		ClientListComponent,
		PhoneMaskDirective],
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
		MatRadioModule,
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatExpansionModule,
		MatSortModule,
		MatPaginatorModule,
		MatDialogModule,
		MatRippleModule,
		CoreModule,
		MatRadioModule,
		PartialsModule,
		CodePreviewModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		RouterModule.forChild(routes),
		Ng2TelInputModule
	],
	entryComponents: [
		LoadEntityDialogComponent,
	],
})
export class ClientModule { }
