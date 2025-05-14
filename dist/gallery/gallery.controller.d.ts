import { GalleryService } from './gallery.service';
import { GalleryItem } from './entities/gallery-item.entity';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    create(file: any, body: {
        alt: string;
        category: string;
        src?: string;
    }): Promise<GalleryItem>;
    findAll(): Promise<GalleryItem[]>;
    findOne(id: string): Promise<GalleryItem>;
    update(id: string, file: any, body: {
        alt?: string;
        category?: string;
        src?: string;
    }): Promise<GalleryItem>;
    remove(id: string): Promise<void>;
}
