import { Repository } from 'typeorm';
import { Tour } from './tour.entity';
export declare class ToursService {
    private toursRepository;
    constructor(toursRepository: Repository<Tour>);
    findAll(): Promise<Tour[]>;
    findOne(id: string): Promise<Tour>;
    create(tour: Partial<Tour>): Promise<Tour>;
    update(id: string, tour: Partial<Tour>): Promise<Tour>;
    remove(id: string): Promise<void>;
}
