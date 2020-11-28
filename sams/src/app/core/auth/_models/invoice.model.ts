import { BaseModel } from '../../_base/crud';

export class Invoice extends BaseModel {
    id: number;
    firstName: string;
    email: string;
    phoneNumber:string;
    jobId:string;
    date:string;
    Address :string;
    city: string;
    pinCode: string;
    clear(): void {
      this.firstName = '';
      this.email = '';
      this.phoneNumber = '';
      this.jobId = '';
      this.date = '';
      this.Address = '';
      this.city = '';
      this.pinCode = '';
    }
  }