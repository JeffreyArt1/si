import { User } from '../users/user.entity';

export interface RequestWithtUser extends Request {
  user: User;
}
