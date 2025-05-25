import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ToursService } from './tours.service';
import { Tour } from './tour.entity';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  findAll(): Promise<Tour[]> {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tour> {
    return this.toursService.findOne(id);
  }

  @Post()
  create(@Body() tour: Partial<Tour>): Promise<Tour> {
    return this.toursService.create(tour);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tour: Partial<Tour>): Promise<Tour> {
    return this.toursService.update(id, tour);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.toursService.remove(id);
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
