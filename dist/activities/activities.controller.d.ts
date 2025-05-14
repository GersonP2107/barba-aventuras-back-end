import { ActivitiesService } from './activities.service';
import { Activity } from './activity.entity';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    findAll(): Promise<Activity[]>;
    findOne(id: string): Promise<Activity>;
    create(activity: Partial<Activity>): Promise<Activity>;
    update(id: string, activity: Partial<Activity>): Promise<Activity>;
    remove(id: string): Promise<void>;
    uploadImage(file: any): {
        filename: any;
    };
}
