import {Model, Column, Table, ForeignKey, DataType} from "sequelize-typescript";
import {User} from "./user";
import {Tweet} from "./tweet";


@Table({
	tableName: 'likes',
	timestamps: false,
})
export class Likes extends Model {
	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID
	})
	userId: string;

	@ForeignKey(() => Tweet)
	@Column({
		type: DataType.UUID
	})
	tweetId: string;
}
