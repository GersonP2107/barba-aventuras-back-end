import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hero_banners')
export class HeroBanner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  order: number;
}