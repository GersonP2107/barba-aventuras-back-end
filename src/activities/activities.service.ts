import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  findAll(): Promise<Activity[]> {
    return this.activitiesRepository.find();
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    return activity;
  }

  async create(activity: Partial<Activity>): Promise<Activity> {
    const newActivity = this.activitiesRepository.create(activity);
    return this.activitiesRepository.save(newActivity);
  }

  async update(id: string, activity: Partial<Activity>): Promise<Activity> {
    await this.activitiesRepository.update(id, activity);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}