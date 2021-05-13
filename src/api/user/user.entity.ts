import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, EventSubscriber } from 'typeorm';
import dayjs from 'dayjs'
import { UserRole } from '../../constants/Enums';

@Entity()
@EventSubscriber()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  firstName!: string;

  @Column({ type: 'text' })
  secondName!: string;

  @Column({ unique: true, type: 'text' })
  email!: string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.DEFAULT_USER
  })
  role!: UserRole

  @Column({ type: 'text' })
  avatarUrl!: string

  @Column({
    type: 'bigint'
  })
  createdAt!: number

  @Column({
    type: 'bigint'
  })
  updatedAt!: number

  @BeforeInsert()
  beforeInsert(): void {
    this.createdAt = dayjs().unix();
  }

  @BeforeUpdate()
  beforeUpdate(): void {
    this.updatedAt = dayjs().unix();
  }
}

export interface IUser {
  id: string
  firstName: string
  secondName: string
  email: string
  role: UserRole
  avatarUrl: string
  createdAt: number
  updatedAt: number
}