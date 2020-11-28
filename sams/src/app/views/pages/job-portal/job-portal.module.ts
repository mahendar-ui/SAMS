import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPortalCreateComponent } from './job-portal-create/job-portal-create.component';
import { JobPortalComponent } from './job-portal.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
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
import { HttpClientModule } from '@angular/common/http';
import { PartialsModule } from '../../partials/partials.module';
import { JobportallistComponent } from './jobportallist/jobportallist.component';
import { JobportaleditComponent } from './jobportaledit/jobportaledit.component';
import { ProgressComponent } from './progress/progress.component';
import { MatChipsModule } from '@angular/material/chips';
import { EditorModule } from '@tinymce/tinymce-angular';

const routes: Routes = [
	{
		path: '',
		component: JobPortalComponent,
		children: [
			{
				path: '',
				redirectTo: 'job-portal',
				pathMatch: 'full'
			},
			{
				path: 'job-portal-create',
				component: JobPortalCreateComponent
			},
			{
				path: 'jobportal-list',
				component: JobportallistComponent
			},
			{
				path: 'jobportal/edit',
				component: JobportaleditComponent
			},
			{
				path: 'jobportal/edit/:id',
				component: JobportaleditComponent
			},
		]
	}
];

@NgModule({
	declarations: [JobPortalComponent, JobPortalCreateComponent, JobportallistComponent, JobportaleditComponent, ProgressComponent],
	imports: [
		CommonModule,
		EditorModule,
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
		MatChipsModule,
	]
})
export class JobPortalModule { }
