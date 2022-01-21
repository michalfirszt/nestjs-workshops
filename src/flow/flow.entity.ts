import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

enum FlowStates {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

@ObjectType('Flow')
@Entity()
export class Flow extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text' })
  description: string;

  @Field(() => Date, { nullable: true })
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: string | null;

  @Field(() => Date, { nullable: true })
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  updatedAt: string | null;

  // @Field(() => FlowStates)
  @Column({ type: 'enum', enum: FlowStates, default: FlowStates.DRAFT })
  state: FlowStates;

  @ManyToOne(() => User, (user) => user.flows, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
