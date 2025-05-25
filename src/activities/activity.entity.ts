import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column('text')
  description: string;

  @Column()
  duration: string;

  @Column()
  difficulty: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  location: string;

  // @Column('simple-array')
  // included: string[];

  // @Column('simple-array')
  // notIncluded: string[];

  // @Column('simple-array')
  // recommendations: string[];
  
  @Column({ default: true })
  isActive: boolean;
}