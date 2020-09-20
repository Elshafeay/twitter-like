import { TWEET_REPOSITORY } from '../../constants/constants';
import { Tweet } from 'src/models/tweet';

export const tweetsProviders = [{
	provide: TWEET_REPOSITORY,
	useValue: Tweet,
}];