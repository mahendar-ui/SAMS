import { BaseModel } from '../../_base/crud';

export class JobPortal extends BaseModel {
    id: number;
    Address :string;
    location: string;
    jobtype: string;
    companyname: string;
    jobtitle: string;
    jobdescription: string;
    startdate: string;
    enddate: string;
    skillGroup:string;
    clear(): void {
      this.startdate = '';
      this.enddate ='';
      this.Address = '';
      this.location = '';
      this.jobtype = '';
      this.companyname = '';
      this.jobtitle = '';
      this.jobdescription ='';
      this.skillGroup ='';
    }
  }