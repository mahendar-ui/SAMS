export class RoleConfig {
  public defaults: any = {
    roleType: {"admin": {
      id: 1,
      type: 'admin'
    },
    "student" : {
      id : 2,
      type: 'US'
    },
    "bank" :{
      id:3,
      type: 'BOS'
    },
    "university" :{
      id:4,
      type: 'UAD'
    }
  }
  };

  public get configs(): any {
    return this.defaults;
  }
}
