import { BlogService } from './blog.service';
import { BlogPost } from './blog-post.entity';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    findAll(): Promise<BlogPost[]>;
    findBySlug(slug: string): Promise<BlogPost>;
    findRelated(slug: string, limit?: number): Promise<BlogPost[]>;
    findOne(id: string): Promise<BlogPost>;
    create(blogPost: Partial<BlogPost>): Promise<BlogPost>;
    update(id: string, updateData: any): Promise<BlogPost>;
    remove(id: string): Promise<void>;
    uploadImage(file: any): {
        filename: any;
    };
}
