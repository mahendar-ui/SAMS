import { BaseModel } from '../../_base/crud';

export class Project extends BaseModel {
    id: number;
    projecttitle: string;
    projectowner: string;
    projectrate:string;
    projecttype:string;
    location:string;
    clientrate:string;
    startdate :string;
    enddate: string;
    user_id:number;
    clear(): void {
      this.projecttitle = '';
      this.projectowner = '';
      this.projectrate = '';
      this.location = '';
      this.clientrate = '';
      this.startdate = '';
      this.enddate = '';
      this.projecttype = '';
    }
  }