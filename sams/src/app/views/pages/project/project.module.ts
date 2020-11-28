import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { CoreModule } from 'src/app/core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActionNotificationComponent, DeleteEntityDialogComponent } from '../../partials/content/crud';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { usersReducer, UserEffects } from 'src/app/core/auth';
import { EffectsModule } from '@ngrx/effects';
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
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const routes: Routes = [
	{
		path: '',
		component: ProjectComponent,
		children: [
			{
				path: '',
				redirectTo: 'project',
				pathMatch: 'full'
			},
			{
				path: 'project-create',
				component: ProjectCreateComponent
      },
      {
				path: 'project-list',
				component: ProjectListComponent
      },
      {
				path: 'proje/edit',
				component: ProjectEditComponent
      },
      {
				path: 'project/edit/:id',
				component: ProjectEditComponent
			},
		]
	}
];

@NgModule({
  declarations: [ProjectComponent, ProjectCreateComponent,ProjectListComponent,ProjectEditComponent],
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
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
    HttpClientModule,
	StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UserEffects]),
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
  ],
  entryComponents: [
    ActionNotificationComponent,
    DeleteEntityDialogComponent,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
})
export class ProjectModule { }
