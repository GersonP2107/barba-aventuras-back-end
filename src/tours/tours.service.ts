import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private toursRepository: Repository<Tour>,
  ) {}

  findAll(): Promise<Tour[]> {
    return this.toursRepository.find({ where: { isActive: true } });
  }

  async findOne(id: string): Promise<Tour> {
    const tour = await this.toursRepository.findOne({ where: { id } });
    if (!tour) {
      throw new NotFoundException(`Tour with ID "${id}" not found`);
    }
    return tour;
  }

  async create(tour: Partial<Tour>): Promise<Tour> {
    const newTour = this.toursRepository.create(tour);
    return this.toursRepository.save(newTour);
  }

  async update(id: string, tour: Partial<Tour>): Promise<Tour> {
    await this.toursRepository.update(id, tour);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.toursRepository.delete(id);
  }
}