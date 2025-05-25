import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './blog-post.entity';
import { Not } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
  ) {}

  findAll(): Promise<BlogPost[]> {
    return this.blogPostRepository.find({ 
      where: { isActive: true },
      order: { createdAt: 'DESC' }
    });
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({ where: { slug, isActive: true } });
    if (!post) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    }
    return post;
  }

  async findById(id: string): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({ where: { id, isActive: true } });
    if (!post) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }
    return post;
  }

  async findRelated(slug: string, limit: number = 2): Promise<BlogPost[]> {
    const post = await this.findBySlug(slug);
    
    // Find posts with the same category, excluding the current post
    return this.blogPostRepository.find({
      where: { 
        category: post.category, 
        isActive: true,
        slug: Not(slug) // Using TypeORM's Not operator instead of MongoDB-style operator
      },
      order: { createdAt: 'DESC' },
      take: limit
    });
  }

  async create(blogPost: Partial<BlogPost>): Promise<BlogPost> {
    // Generate slug if not provided
    if (!blogPost.slug && blogPost.title) {
      blogPost.slug = this.generateSlug(blogPost.title);
    } else if (!blogPost.title) {
      throw new Error('Title is required to create a blog post');
    }
    
    const newBlogPost = this.blogPostRepository.create(blogPost);
    return this.blogPostRepository.save(newBlogPost);
  }

  async update(id: string, blogPost: Partial<BlogPost>): Promise<BlogPost> {
    try {
      // Update slug if title is changed and slug is not explicitly provided
      if (blogPost.title && !blogPost.slug) {
        blogPost.slug = this.generateSlug(blogPost.title);
      }
      
      // Handle tags if they come as a string instead of an array
      if (blogPost.tags && typeof blogPost.tags === 'string') {
        blogPost.tags = (blogPost.tags as unknown as string)
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== '');
      }
      
      await this.blogPostRepository.update(id, blogPost);
      return this.findById(id);
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.blogPostRepository.delete(id);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }
}