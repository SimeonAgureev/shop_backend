import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({})
  name!: string;

  @ManyToOne(() => Category, category => category.children)
  parent!: Category;

  @OneToMany(() => Category, category => category.parent)
  children!: Category[];

  @ManyToMany(() => Product)
  @JoinTable()
  products!: Product[];
}

export interface ICategory {
  id: string,
  name: string,
  parent: ICategory,
  children: ICategory[],
  products: Product[]
}