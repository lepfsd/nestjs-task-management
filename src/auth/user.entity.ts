import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	salt: string;

	async validatePassword(password: string): Promise<boolean> {
		const hash = await bcrypt.compareSync(password, this.salt);
		return hash;
	}
}