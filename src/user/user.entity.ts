import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Index('users-email-unique', ['email'], { unique: true })
  @Column()
  email: string;

  @Column({
    name: 'email_verified_at',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  emailVerifiedAt: string | null;

  @Column({ nullable: true })
  password: string | null;
}
