import { User } from '@modules/users/entities';

export interface RequestWithtUser extends Request {
  user: User;
}
