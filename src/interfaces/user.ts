import {Pet} from './pet';

export interface User {
  username: string;
  email: string;
  pets?: Pet[];
}
