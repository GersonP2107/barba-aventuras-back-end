import { HeroBannerService } from './hero-banner.service';
import { HeroBanner } from './entities/hero-banner.entity';
export declare class HeroBannerController {
    private readonly heroBannerService;
    constructor(heroBannerService: HeroBannerService);
    findAll(): Promise<HeroBanner[]>;
    findOne(id: string): Promise<HeroBanner>;
    create(banner: Partial<HeroBanner>): Promise<HeroBanner>;
    update(id: string, banner: Partial<HeroBanner>): Promise<HeroBanner>;
    remove(id: string): Promise<void>;
    uploadImage(file: any): {
        filename: any;
        path: string;
    };
}
