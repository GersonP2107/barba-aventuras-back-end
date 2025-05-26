import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroBanner } from './entities/hero-banner.entity';

@Injectable()
export class HeroBannerService {
  constructor(
    @InjectRepository(HeroBanner)
    private heroBannerRepository: Repository<HeroBanner>,
  ) {}

  findAll(): Promise<HeroBanner[]> {
    return this.heroBannerRepository.find({ 
      where: { isActive: true },
      order: { order: 'ASC' } 
    });
  }

  async findOne(id: string): Promise<HeroBanner> {
    const banner = await this.heroBannerRepository.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException(`Hero banner with ID "${id}" not found`);
    }
    return banner;
  }

  async create(banner: Partial<HeroBanner>): Promise<HeroBanner> {
    const newBanner = this.heroBannerRepository.create(banner);
    return this.heroBannerRepository.save(newBanner);
  }

  async update(id: string, banner: Partial<HeroBanner>): Promise<HeroBanner> {
    await this.heroBannerRepository.update(id, banner);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.heroBannerRepository.delete(id);
  }
}