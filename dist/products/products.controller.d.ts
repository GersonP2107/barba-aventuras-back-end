import { ProductsService } from './products.service';
import { Product } from './product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(product: Partial<Product>): Promise<Product>;
    update(id: string, product: Partial<Product>): Promise<Product>;
    remove(id: string): Promise<void>;
    uploadImage(file: any): {
        filename: any;
    };
}
