import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

import { Flow } from '../flow/flow.entity';

enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@ObjectType('User')
@Entity()
export class User extends BaseEntity {
  @Field()
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

  @OneToMany(() => Flow, (flow) => flow.user)
  flows: Flow[];

  async getIsPasswordValid(password) {
    const validPassword = await bcrypt.compare(password, this.password);
    return validPassword;
  }
}
