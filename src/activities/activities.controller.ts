import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ActivitiesService } from './activities.service';
import { Activity } from './activity.entity';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  findAll(): Promise<Activity[]> {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Activity> {
    return this.activitiesService.findOne(id);
  }

  @Post()
  create(@Body() activity: Partial<Activity>): Promise<Activity> {
    return this.activitiesService.create(activity);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() activity: Partial<Activity>): Promise<Activity> {
    return this.activitiesService.update(id, activity);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.activitiesService.remove(id);
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