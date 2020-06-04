import {Pet} from './pet';

export interface User {
  uid: string;
  username: string;
  email: string;
  pets?: Pet[];
}
