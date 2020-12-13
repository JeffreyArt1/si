import { User } from '../../users/entities/';

export interface RequestWithtUser extends Request {
  user: User;
}
