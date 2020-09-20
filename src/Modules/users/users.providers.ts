import { User } from '../../models/user';
import { USER_REPOSITORY } from '../../constants/constants';

export const usersProviders = [{
	provide: USER_REPOSITORY,
	useValue: User,
}];