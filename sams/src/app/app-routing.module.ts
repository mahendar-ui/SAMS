// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
// Auth
import { AuthGuard } from './core/auth';
import { RoleConfig } from './core/auth/config/role.config';
import {AccountCreateComponent} from './views/pages/account-management/account-create/account-create.component';
import {AccountViewComponent} from './views/pages/account-management/account-view/account-view.component';
import {AccountListComponent} from './views/pages/account-management/account-list/account-list.component';
const roles = new RoleConfig().configs;
const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},
  {path: 'error', loadChildren: () => import('./views/pages/error/error.module').then(m => m.ErrorModule)},
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        canActivate: [AuthGuard],
        data:{ role : [roles.roleType.admin,roles.roleType.student,roles.roleType.bank,
          roles.roleType.university]},
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        // canActivate: [AuthGuard],
        // data:{ role : [roles.roleType.admin,roles.roleType.manager]},
        path: 'user-management',
        loadChildren: () => import('./views/pages/user-management/user-management.module').then(m => m.UserManagementModule),
      },
      {
        // canActivate: [AuthGuard],
        // data:{ role : [roles.roleType.admin,roles.roleType.manager]},
        path: 'profile-management',
        loadChildren: () => import('./views/pages/profile-management/profile-management.module').then(m => m.ProfileManagementModule),
      },
      {
        // canActivate: [AuthGuard],
        // data:{ role : [roles.roleType.admin,roles.roleType.manager]},
        path: 'account-management',
        loadChildren: () => import('./views/pages/account-management/account-management.module').then(m => m.AccountManagementModule),
      },
      // {
			// 	canActivate: [AuthGuard],
			// 	data:{ role : [roles.roleType.student]},
			// 	path: 'account-create',
			// 	component: AccountCreateComponent
			// },
			// {
			// 	canActivate: [AuthGuard],
			// 	data:{ role : [roles.roleType.admin,roles.roleType.student,roles.roleType.bank,
			// 		roles.roleType.university]},
			// 	path: 'account-view',
			// 	component: AccountViewComponent
			// },
			// {
			// 	canActivate: [AuthGuard],
			// 	data:{ role : [roles.roleType.admin,roles.roleType.student,roles.roleType.bank,
			// 		roles.roleType.university]},
			// 	path: 'account-list',
			// 	component: AccountListComponent
			// },
      {
        path: 'employee',
        loadChildren: () => import('./views/pages/employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'client',
        loadChildren: () => import('./views/pages/client/client.module').then(m => m.ClientModule),
      },
      {
        path: 'project',
        loadChildren: () => import('./views/pages/project/project.module').then(m => m.ProjectModule),
      },
      {
      path: 'invoice',
        loadChildren: () => import('./views/pages/invoice/invoice.module').then(m => m.InvoiceModule),
      },
      {
        path: 'job-portal',
          loadChildren: () => import('./views/pages/job-portal/job-portal.module').then(m => m.JobPortalModule),
      },
      {
        canActivate: [AuthGuard],
        data:{ role : [roles.roleType.admin,roles.roleType.manager,roles.roleType.staff]},
        path: 'contract',
          loadChildren: () => import('./views/pages/contract/contract.module').then(m => m.ContractModule),
      },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
       {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  
})
export class AppRoutingModule {
}
