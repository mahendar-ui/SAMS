import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User extends BaseModel {
  id: number;
  stakeholder:string;
  user_id:number;
  username: string;
  password: string;
  email: string;
  role: any
  fullname: string;
  phonenumber: string;
	stakeholder_bank: string;
	stakeholder_university: string;

  clear(): void {
    this.id = undefined;
    this.stakeholder = '';
    this.stakeholder_bank= '';
    this.stakeholder_university='';
    this.username = '';
    this.password = '';
    this.email = '';
    this.role = '';
    this.fullname = '';
    this.phonenumber = '';
  }
}
