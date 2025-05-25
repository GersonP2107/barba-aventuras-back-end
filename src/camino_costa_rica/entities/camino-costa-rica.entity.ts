import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('camino_costa_rica_info')
export class CaminoCostaRicaInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  headerSubtitle: string;

  @Column({ type: 'varchar', length: 255 })
  headerTitle: string;

  @Column({ type: 'text' })
  headerParagraph: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mainImageSrc: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mainImageAlt: string;

  @Column({ type: 'varchar', length: 255 })
  contentTitle: string;

  @Column({ type: 'text' })
  contentParagraph: string;
}