import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column('text')
  description: string;

  @Column()
  duration: string;

  @Column()
  destination: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: string;

  @Column()
  difficulty: string;

  @Column({ default: true })
  isActive: boolean;
}