"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_post_entity_1 = require("./blog-post.entity");
const typeorm_3 = require("typeorm");
let BlogService = class BlogService {
    blogPostRepository;
    constructor(blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }
    findAll() {
        return this.blogPostRepository.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' }
        });
    }
    async findBySlug(slug) {
        const post = await this.blogPostRepository.findOne({ where: { slug, isActive: true } });
        if (!post) {
            throw new common_1.NotFoundException(`Blog post with slug "${slug}" not found`);
        }
        return post;
    }
    async findById(id) {
        const post = await this.blogPostRepository.findOne({ where: { id, isActive: true } });
        if (!post) {
            throw new common_1.NotFoundException(`Blog post with ID "${id}" not found`);
        }
        return post;
    }
    async findRelated(slug, limit = 2) {
        const post = await this.findBySlug(slug);
        return this.blogPostRepository.find({
            where: {
                category: post.category,
                isActive: true,
                slug: (0, typeorm_3.Not)(slug)
            },
            order: { createdAt: 'DESC' },
            take: limit
        });
    }
    async create(blogPost) {
        if (!blogPost.slug && blogPost.title) {
            blogPost.slug = this.generateSlug(blogPost.title);
        }
        else if (!blogPost.title) {
            throw new Error('Title is required to create a blog post');
        }
        const newBlogPost = this.blogPostRepository.create(blogPost);
        return this.blogPostRepository.save(newBlogPost);
    }
    async update(id, blogPost) {
        if (blogPost.title && !blogPost.slug) {
            blogPost.slug = this.generateSlug(blogPost.title);
        }
        await this.blogPostRepository.update(id, blogPost);
        return this.findById(id);
    }
    async remove(id) {
        await this.blogPostRepository.delete(id);
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-');
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_post_entity_1.BlogPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogService);
//# sourceMappingURL=blog.service.js.map