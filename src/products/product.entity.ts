import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column({ default: 5 })
  rating: number;

  @Column({ default: true })
  isActive: boolean;
}