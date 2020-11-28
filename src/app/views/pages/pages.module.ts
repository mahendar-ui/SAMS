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
import { MatDatepickerModule } from '@angular/material/datepicker';
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
    MatDatepickerModule
  ],
  providers: []
})
export class PagesModule {
}
