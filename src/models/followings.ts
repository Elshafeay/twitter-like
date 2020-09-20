import {Model, Column, Table, ForeignKey, DataType} from "sequelize-typescript";
import {User} from "./user";


@Table({
	tableName: 'followings',
	timestamps: false,
})
export class Followings extends Model {

	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID
	})
	userId: string;

	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID
	})
	followerId: string;
}
