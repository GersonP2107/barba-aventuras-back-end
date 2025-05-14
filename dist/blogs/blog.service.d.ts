import { Repository } from 'typeorm';
import { BlogPost } from './blog-post.entity';
export declare class BlogService {
    private blogPostRepository;
    constructor(blogPostRepository: Repository<BlogPost>);
    findAll(): Promise<BlogPost[]>;
    findBySlug(slug: string): Promise<BlogPost>;
    findById(id: string): Promise<BlogPost>;
    findRelated(slug: string, limit?: number): Promise<BlogPost[]>;
    create(blogPost: Partial<BlogPost>): Promise<BlogPost>;
    update(id: string, blogPost: Partial<BlogPost>): Promise<BlogPost>;
    remove(id: string): Promise<void>;
    private generateSlug;
}
