import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch, // Using Patch for partial updates
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GalleryService } from './gallery.service';
import { GalleryItem } from './entities/gallery-item.entity'; // Import the entity

// Helper for multer filename
const generateFilename = (req, file, callback) => {
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}${extname(file.originalname)}`);
};

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { // 'image' should match the field name in FormData from frontend
      storage: diskStorage({
        destination: './uploads/gallery', // Ensure this directory exists or is created
        filename: generateFilename,
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @UploadedFile() file: any, // Changed from Express.Multer.File to any
    @Body() body: { alt: string; category: string; src?: string }, // src can be optional if file is always provided
  ): Promise<GalleryItem> {
    let imagePath = body.src; // Allow providing src directly (e.g. for external URLs)
    if (file) {
      imagePath = `/uploads/gallery/${file.filename}`; // Path to be stored in DB
    }
    if (!imagePath) {
        throw new Error('Image source or file is required.');
    }
    const galleryItemData = { src: imagePath, alt: body.alt, category: body.category };
    return this.galleryService.create(galleryItemData as any); // Cast as any if not using DTOs
  }

  @Get()
  findAll(): Promise<GalleryItem[]> {
    return this.galleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GalleryItem> {
    return this.galleryService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', { // 'image' for the new file
      storage: diskStorage({
        destination: './uploads/gallery',
        filename: generateFilename,
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: any,
    @Body() body: { alt?: string; category?: string; src?: string },
  ): Promise<GalleryItem> {
    const updateData: Partial<GalleryItem> = { ...body };
    if (file) {
      updateData.src = `/uploads/gallery/${file.filename}`;
    }
    // If src is explicitly set in body and no file, use body.src
    // If neither file nor body.src, existing src will be kept by the service's preload logic
    return this.galleryService.update(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.galleryService.remove(id);
  }
}