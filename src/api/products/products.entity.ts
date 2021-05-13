import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Brand, IBrand } from '../brand/brand.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string

  @Column('simple-array')
  images!: string[]

  @ManyToOne(() => Brand, brand => brand.products)
  brand!: Brand
}

export interface IProduct {
  id: string
  title: string
  description: string
  images: string[]
  brand: IBrand
}