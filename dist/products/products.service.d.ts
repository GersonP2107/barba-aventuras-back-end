import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(product: Partial<Product>): Promise<Product>;
    update(id: string, product: Partial<Product>): Promise<Product>;
    remove(id: string): Promise<void>;
}
