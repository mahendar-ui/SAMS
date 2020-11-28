import { BaseModel } from '../../_base/crud';

export class Contract extends BaseModel{
    id: number;
    consultname:string;
    jobid:number;
    startdate :string;
    enddate: string;
    projectid:number;
    clientid:number;
    employeeid:number;
    contract_status:string;
    user_id:number;
    clear(): void {
        this.consultname = '';
        this.startdate = '';
        this.enddate = '';
    }
}
