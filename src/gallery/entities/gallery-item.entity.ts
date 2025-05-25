import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('gallery_items') // You can choose a table name, e.g., 'gallery_items'
export class GalleryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  src: string; // Path to the image file

  @Column()
  alt: string; // Alt text for the image

  @Column()
  category: string; // Category of the image

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}