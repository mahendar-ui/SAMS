export class MainConfig {
  public defaults: any = {
    client: {
        place: 'US',
        state: 'Dallas',
        currency : "$",
        dateFormat : "MM/DD/YY",
        time : "hh:mm:ss.s",
        timeZone : "UTC"
    },
    
  };

  public get configs(): any {
    return this.defaults;
  }
}
