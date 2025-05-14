import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
export declare class ActivitiesService {
    private activitiesRepository;
    constructor(activitiesRepository: Repository<Activity>);
    findAll(): Promise<Activity[]>;
    findOne(id: string): Promise<Activity>;
    create(activity: Partial<Activity>): Promise<Activity>;
    update(id: string, activity: Partial<Activity>): Promise<Activity>;
    remove(id: string): Promise<void>;
}
