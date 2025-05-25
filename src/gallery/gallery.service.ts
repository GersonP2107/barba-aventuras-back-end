import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryItem } from './entities/gallery-item.entity'; // Ensure this path is correct

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryItem)
    private readonly galleryRepository: Repository<GalleryItem>,
  ) {}

  // Assuming body matches structure of GalleryItem or a subset for creation
  create(galleryItemData: Partial<GalleryItem>): Promise<GalleryItem> {
    const newItem = this.galleryRepository.create(galleryItemData);
    return this.galleryRepository.save(newItem);
  }

  findAll(): Promise<GalleryItem[]> {
    return this.galleryRepository.find({ order: { createdAt: 'DESC' } }); // Optional: order by creation date
  }

  async findOne(id: string): Promise<GalleryItem> {
    const item = await this.galleryRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Gallery item with ID "${id}" not found`);
    }
    return item;
  }

  async update(id: string, updateGalleryItemData: Partial<GalleryItem>): Promise<GalleryItem> {
    // Preload ensures we only update fields that are present in updateGalleryItemData
    // and that the entity exists.
    const item = await this.galleryRepository.preload({
      id: id,
      ...updateGalleryItemData,
    });
    if (!item) {
      throw new NotFoundException(`Gallery item with ID "${id}" not found`);
    }
    return this.galleryRepository.save(item);
  }

  async remove(id: string): Promise<void> {
    const result = await this.galleryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gallery item with ID "${id}" not found`);
    }
    // No explicit return needed for void, or return Promise.resolve();
  }
}