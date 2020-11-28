import { BaseModel } from '../../_base/crud';

export class Timesheet extends BaseModel {
    id: number;
    invoice_name: string;
    invoice_receipt:string;
    invoice_created_date: Date;
    status:string;
    clear(): void {
      this.invoice_name = '';
      this.status = '';
    }
  }