import {Table, Column, Model, Default, ForeignKey, BelongsTo, DataType, BelongsToMany} from 'sequelize-typescript';
import { Likes } from './likes';
import { User } from './user';


@Table({
	tableName: 'tweets',
})
export class Tweet extends Model {

	@Default(DataType.UUIDV4)
	@Column({
		type: DataType.UUID,
		allowNull: false,
		unique: true,
		primaryKey: true
	})
	id: string;

	@Column 
	text?: string;
	
	@Column 
	image?: string;
	
	@Default(0)
	@Column({
		type: DataType.INTEGER,
	})
	likes: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID
	})
	authorId: string;
	
	@BelongsTo(() => User)
	author: User;

	@BelongsToMany(() => User, () => Likes)
	fans?: User[];
}
