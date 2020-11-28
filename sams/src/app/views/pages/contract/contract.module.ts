import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { ContractSectionComponent } from './contract-section/contract-section.component';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { ContractFiltersComponent } from './contract-section/contract-filters/contract-filters.component';
import { ContractMatStepsComponent } from './contract-section/contract-mat-steps/contract-mat-steps.component';
import { ProjectDetailsComponent } from './contract-section/project-details/project-details.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ClientDetailsComponent } from './contract-section/client-details/client-details.component';
import { EmployeeDetailComponent } from './contract-section/employee-detail/employee-detail.component';
// Auth
import { AuthGuard } from '../../../core/auth/';
import { RoleConfig } from '../../../core/auth/config/role.config';
import { UpdateStatusDialogComponent } from '../../partials/content/crud';
import { ApprovedContractComponent } from './approved-contract/approved-contract.component';
const roles = new RoleConfig().configs;
const routes: Routes = [
  {
    path: '',
    component: ContractComponent,
    children: [
      {
        path: '',
        redirectTo: 'contract',
        pathMatch: 'full'
      },
      {
        canActivate: [AuthGuard],
        data:{ role : [roles.roleType.admin,roles.roleType.manager,roles.roleType.staff]},
        path: 'contract-create',
        component: ContractSectionComponent
      },
      {
        canActivate: [AuthGuard],
        data:{ role : [roles.roleType.admin,roles.roleType.manager,roles.roleType.staff]},
				path: 'contract-list',
				component: ContractListComponent
      },
      {
        canActivate: [AuthGuard],
        data:{ role : [roles.roleType.admin,roles.roleType.manager,roles.roleType.staff]},
        path: 'contract-edit',
        component: ContractSectionComponent
      },
      {
        canActivate: [AuthGuard],
        data:{ role : [roles.roleType.admin,roles.roleType.manager,roles.roleType.staff]},
        path: 'contract-edit/:id',
        component: ContractSectionComponent
      },
    ]
  }
];
@NgModule({
  providers: [
		ContractMatStepsComponent,
		ContractFiltersComponent,
    ProjectDetailsComponent,
    ClientDetailsComponent,
    EmployeeDetailComponent,
  ],
  entryComponents: [UpdateStatusDialogComponent,ApprovedContractComponent],
  declarations: [ContractComponent,
      ContractSectionComponent,
     ContractFiltersComponent,
    ContractMatStepsComponent,
     ProjectDetailsComponent,
     ContractListComponent,
     ClientDetailsComponent,
     EmployeeDetailComponent,
     ApprovedContractComponent,],
  imports: [
    CommonModule,
    CoreModule,
    PartialsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
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
  ]
})
export class ContractModule { }
