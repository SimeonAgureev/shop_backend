import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IProduct, Product } from '../products/products.entity';

@Entity()
export class Brand {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  logoURL!: string

  @Column({ type: 'text' })
  description!: string

  @OneToMany(() => Product, product => product.brand)
  products!: Product[];
}

export interface IBrand {
  id: string
  name: string
  logoURL: string
  description: string
  products: IProduct
}