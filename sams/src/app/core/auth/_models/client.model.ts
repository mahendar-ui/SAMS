import { BaseModel } from '../../_base/crud';

export class Client extends BaseModel {
    id: number;
    clientFirstname: string;
    clientLastname:string;
    clientPhonenumber:string;
    clientEmail:string;
    clientAddress :string;
    clientDetails: string;
    clientFaxnumber:string;
    contactname:string;
    contactemail:string;
    contactphone:string;
    supervisorFirstname:string;
    supervisorLastname :string;
    supervisorPhonenumber:string;
    supervisorEmail:string;
    timeSheet:string;
    accountDetails : string;
    timesheetFirstname: string;
    timesheetEmail:string;
    timesheetPhonenumber:string;
    user_id:number;
    clear(): void {
      this.clientFirstname = '';
      this.clientLastname = '';
      this.clientPhonenumber = '';
      this.clientEmail = '';
      this.clientAddress = '';
      this.clientDetails = '';
      this.clientFaxnumber = '';
      this.supervisorFirstname = '';
      this.supervisorLastname = '';
      this.supervisorPhonenumber = '';
      this.supervisorEmail = '';
      this.timeSheet = '';
      this.accountDetails = '';
    }
  }