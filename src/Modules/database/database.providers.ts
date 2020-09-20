import { Sequelize } from 'sequelize-typescript';
import { Tweet } from 'src/models/tweet';
import { User } from 'src/models/user';
import { Followings } from 'src/models/followings';
import { Likes } from 'src/models/likes';
import { SEQUELIZE, DEVELOPMENT, PRODUCTION } from '../../constants/constants';
import { databaseConfig } from './database.config';


export const databaseProviders = [{
	provide: SEQUELIZE,
	useFactory: async () => {
		let config;
		switch (process.env.NODE_ENV) {
		case DEVELOPMENT:
			config = databaseConfig.development;
			break;
		case PRODUCTION:
			config = databaseConfig.production;
			break;
		default:
			config = databaseConfig.development;
		}
		const sequelize = new Sequelize(config);
		sequelize.addModels([User, Tweet, Followings, Likes]);
		await sequelize.sync();
		return sequelize;
	},
}];