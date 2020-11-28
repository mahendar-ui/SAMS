export class PageConfig {
  public defaults: any = {
    dashboard: {
      page: {
        // title: 'Dashboard',
        desc: 'Latest updates and statistic charts'
      },
    },
    'user-management': {
      users: {
        // page: {title: 'Users', desc: ''}
      },
      roles: {
        page: {title: 'Roles', desc: ''}
      }
    },
    'Employee/Consultant Details': {
      users: {
        // page: {title: 'Employees', desc: ''}
      },
      roles: {
        page: {title: 'Employee List', desc: ''}
      }
    },
    header: {
      actions: {
        page: {title: 'Actions', desc: 'Actions example page'}
      }
    },
    profile: {
      page: {title: 'User Profile', desc: ''}
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
