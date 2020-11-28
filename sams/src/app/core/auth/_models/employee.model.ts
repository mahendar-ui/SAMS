import { BaseModel } from '../../_base/crud';

export class Employee extends BaseModel {
    append(arg0: string, fileToUpload: File, name: string) {
      throw new Error("Method not implemented.");
    }
    id: number;
    first_name: string;
    last_name:string;
    email: string;
    phone_number: string;
    address: string;
    city:string;
    pincode:string;
    experience_years:string;
    // tslint:disable-next-line: variable-name
    previous_company:string;
    gender:string;
    birth_date:string;
    visa_status:string;
    skillGroup:string;
    hire_date:string;
    password:string;
    id_proof:any;
    visa_type: string;
    user_id:number;
    clear(): void {
      this.first_name = '';
      this.last_name = '';
      this.email = '';
      this.phone_number = '';
      this.address = '';
      this.city = '';
      this.pincode = '';
      this.experience_years = '';
      this.previous_company ='';
      this.gender = '';
      this.birth_date = '';
      this.visa_status ='';
      this.skillGroup ='';
      this.hire_date ='';
      this.id_proof ='';
      this.visa_type ='';
      this.password='';
        }
  }