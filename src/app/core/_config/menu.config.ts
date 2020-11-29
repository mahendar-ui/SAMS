import { RoleConfig } from '../../core/auth/config/role.config';
const roles = new RoleConfig().configs;
export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Dashboards',
          root: true,
          alignment: 'left',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
        },
        {
          title: 'User Management',
          bullet: 'dot',
          icon: 'flaticon-user',
          submenu: [
            {
              title: 'Users',
              page: '/user-management/users'
            },
            {
              title: 'Roles',
              page: '/user-management/roles'
            }
          ]
        },
      ]
    },
    aside: {
      self: {},
      items: [
        {
          title: 'Dashboard',
          roleAccess : [1,2,3,4],
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'User Management',
          roleAccess : [1],
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          submenu: [
            {
              title: 'Create-user',
              page: '/user-management/create-user'
            },
            {
              title: 'Users',
              page: '/user-management/users'
            }
          ]
        },
        {
          title: 'Profile Management',
          // roleAccess : [1,3],
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          submenu: [
            {
              title: 'Profile',
              page: '/profile-management/profile'
            },
            {
              title: 'Profile Edit',
              page: '/profile-management/profile-edit'
            },
            {
              title: 'Password Change',
              page: '/profile-management/profile-password-change'
            }
          ]
        },
        {
          title: 'Application Management',
          // roleAccess : [1,3],
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          submenu: [
            {
              roleAccess : [roles.roleType.student],
              title: 'Application Create',
              page: '/account-management/account-create'
            },
            {
              roleAccess : [roles.roleType.admin],
              title: 'Aplication View',
              page: '/account-management/account-view'
            },{
              roleAccess : [roles.roleType.student,roles.roleType.bank,
                roles.roleType.university],
              title: 'Application List',
              page: '/account-management/account-list'
            }
          ]
        },
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
