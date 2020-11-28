import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class Auth extends BaseModel {
  id: number;
  username: string;
  email: string;
  phone: string;
  accessToken: string;
  refreshToken: string;
  roles: string;
  pic: string;
  fullname: string;
  occupation: string;

  clear(): void {
    this.id = undefined;
    this.username = '';
    this.email = '';
    this.roles = '';
    this.fullname = '';
    this.accessToken = 'access-token-' + Math.random();
    this.refreshToken = 'access-token-' + Math.random();
    this.pic = './assets/media/users/default.jpg';
    this.occupation = '';
    
  }
}
