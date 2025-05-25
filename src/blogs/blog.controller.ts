import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
  Query, // Added Query here
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { BlogService } from './blog.service';
import { BlogPost } from './blog-post.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(): Promise<BlogPost[]> {
    return this.blogService.findAll();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string): Promise<BlogPost> {
    return this.blogService.findBySlug(slug);
  }

  @Get('related/:slug')
  findRelated(
    @Param('slug') slug: string,
    @Query('limit') limit: number = 2
  ): Promise<BlogPost[]> {
    return this.blogService.findRelated(slug, limit);
  }



  @Get(':id')
  findOne(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.findById(id);
  }

  @Post()
  create(@Body() blogPost: Partial<BlogPost>): Promise<BlogPost> {
    return this.blogService.create(blogPost);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: any): Promise<BlogPost> {
    // Map frontend field names to entity field names if needed
    const mappedData: Partial<BlogPost> = {
      ...updateData,
      // Map imageUrl to image if needed
      image: updateData.imageUrl || updateData.image,
    };
    
    return this.blogService.update(id, mappedData);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(id);
  }
  @Post('upload')
  @UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }),
  )
  uploadImage(@UploadedFile() file: any) {
    return { filename: file.filename };
  }
}