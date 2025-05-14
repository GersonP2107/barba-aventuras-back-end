import { ToursService } from './tours.service';
import { Tour } from './tour.entity';
export declare class ToursController {
    private readonly toursService;
    constructor(toursService: ToursService);
    findAll(): Promise<Tour[]>;
    findOne(id: string): Promise<Tour>;
    create(tour: Partial<Tour>): Promise<Tour>;
    update(id: string, tour: Partial<Tour>): Promise<Tour>;
    remove(id: string): Promise<void>;
    uploadFile(file: any): {
        filename: any;
        url: string;
    };
}
