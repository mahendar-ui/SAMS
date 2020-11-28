// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { UserManagementModule } from './user-management/user-management.module';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InvoiceListModule } from './invoice-list/invoice-list.module';
import { JobPortalModule } from './job-portal/job-portal.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ClientModule } from './client/client.module';
import { ContractModule } from './contract/contract.module';
import { ProfileManagementModule } from './profile-management/profile-management.module';
import { AccountManagementModule } from './account-management/account-management.module';;

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    PartialsModule,
    UserManagementModule,
    ProfileManagementModule,
    AccountManagementModule,
    EmployeeModule,
    ProjectModule,
    MatDatepickerModule,
    InvoiceListModule,
    JobPortalModule,
    InvoiceModule,
    ClientModule,
    ContractModule,
  ],
  providers: []
})
export class PagesModule {
}
