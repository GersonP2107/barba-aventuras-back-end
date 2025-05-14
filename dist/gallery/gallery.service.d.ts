import { Repository } from 'typeorm';
import { GalleryItem } from './entities/gallery-item.entity';
export declare class GalleryService {
    private readonly galleryRepository;
    constructor(galleryRepository: Repository<GalleryItem>);
    create(galleryItemData: Partial<GalleryItem>): Promise<GalleryItem>;
    findAll(): Promise<GalleryItem[]>;
    findOne(id: string): Promise<GalleryItem>;
    update(id: string, updateGalleryItemData: Partial<GalleryItem>): Promise<GalleryItem>;
    remove(id: string): Promise<void>;
}
