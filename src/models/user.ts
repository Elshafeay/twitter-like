import {Table, Column, Model, HasMany, BelongsToMany, UpdatedAt, CreatedAt, DataType, Default, Length} from 'sequelize-typescript';
import { Followings } from './followings';
import { Likes } from './likes';
import { Tweet } from './tweet';


@Table({
	tableName: 'users',
})
export class User extends Model {

	@Default(DataType.UUIDV4)
	@Column({
		type: DataType.UUID,
		unique: true,
		primaryKey: true
	})
	id: string;

	@Length({ msg:"Name is too short", min: 3, max: 50 })
	@Column({
		type: DataType.STRING(50),
	})
	name: string;
	
	@Length({ msg:"Username is too short", min: 2, max: 50 })
	@Column({
		type: DataType.STRING(50),
		unique: {
			name: "unique username",
			msg: "This username has been taken"
		}
	})
	username: string;
	
	@Column({
		type: DataType.STRING(100),
		unique: {
			name: "unique email address",
			msg: "This email has been taken"
		},
		validate: {
			isEmail: true,
		}
	})
	email: string;
	
	@Column({
		type: DataType.TEXT
	})
	password: string;
	
	@Column({
		type: DataType.TEXT,
	})
	avatar?: string;
	
	@HasMany(() => Tweet)
	tweets: Tweet[];
	
	@BelongsToMany(() => User, () => Followings, 'followerId')
	following?: User[];
	
	@BelongsToMany(() => User, () => Followings, 'userId', 'followerId')
	followers?: User[];
	
	@BelongsToMany(() => Tweet, () => Likes, 'userId')
	likedTweets?: Tweet[];

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}
