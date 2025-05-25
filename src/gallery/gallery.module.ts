import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express'; // Import MulterModule
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { GalleryItem } from './entities/gallery-item.entity';
import { existsSync, mkdirSync } from 'fs'; // For creating upload directory

const galleryUploadPath = './uploads/gallery';
if (!existsSync(galleryUploadPath)) {
  mkdirSync(galleryUploadPath, { recursive: true });
}


@Module({
  imports: [
    TypeOrmModule.forFeature([GalleryItem]),
    MulterModule.register({
      dest: './uploads/gallery',
    }),
  ],
  controllers: [GalleryController], // Make sure GalleryController is here
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}