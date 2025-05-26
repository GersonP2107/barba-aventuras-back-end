import { Repository } from 'typeorm';
import { HeroBanner } from './entities/hero-banner.entity';
export declare class HeroBannerService {
    private heroBannerRepository;
    constructor(heroBannerRepository: Repository<HeroBanner>);
    findAll(): Promise<HeroBanner[]>;
    findOne(id: string): Promise<HeroBanner>;
    create(banner: Partial<HeroBanner>): Promise<HeroBanner>;
    update(id: string, banner: Partial<HeroBanner>): Promise<HeroBanner>;
    remove(id: string): Promise<void>;
}
