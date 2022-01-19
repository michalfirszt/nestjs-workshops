import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@ObjectType('User')
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Index('users-email-unique', ['email'], { unique: true })
  @Column()
  email: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Column({
    name: 'email_verified_at',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  emailVerifiedAt: string | null;

  @Column({ nullable: true })
  password: string | null;

  async getIsPasswordValid(password) {
    const validPassword = await bcrypt.compare(password, this.password);
    return validPassword;
  }
}
