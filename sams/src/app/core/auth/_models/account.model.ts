import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class Account extends BaseModel {
  id: number;
  firstname:string;
  lastname:string;
  student_email: string;
  student_id: string;
  phone_number: string;
  address: any
  city: string;
  postcode: string;
  university:string;
  bank:string;
  course:string;
  user_id:number;
  request_uad:boolean;
	passport: string;
	brpnumber: string;
  bos_message: string;
  uad_message: string;
  clear(): void {
    this.id = undefined;
    this.firstname = '';
    this.lastname = '';
    this.student_email = '';
    this.student_id = '';
    this.phone_number = '';
    this.address = '';
    this.city = '';
    this.postcode = '';
    this.course = '';
    this.university = '';
    this.bank = '';
    this.user_id = undefined;
    this.request_uad = false;
  }
}
