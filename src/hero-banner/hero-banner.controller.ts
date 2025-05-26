import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HeroBannerService } from './hero-banner.service';
import { HeroBanner } from './entities/hero-banner.entity';

@Controller('hero-banner')
export class HeroBannerController {
  constructor(private readonly heroBannerService: HeroBannerService) {}

  @Get()
  findAll(): Promise<HeroBanner[]> {
    return this.heroBannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<HeroBanner> {
    return this.heroBannerService.findOne(id);
  }

  @Post()
  create(@Body() banner: Partial<HeroBanner>): Promise<HeroBanner> {
    return this.heroBannerService.create(banner);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() banner: Partial<HeroBanner>): Promise<HeroBanner> {
    return this.heroBannerService.update(id, banner);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.heroBannerService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/hero',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `hero-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadImage(@UploadedFile() file: any) {
    return { filename: file.filename, path: `/uploads/hero/${file.filename}` };
  }
}