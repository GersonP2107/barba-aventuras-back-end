import { Controller, Get, Post, Put, Body, Param, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CaminoCostaRicaService } from './camino-costa-rica.service';
import { CaminoCostaRicaInfo } from './entities/camino-costa-rica.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/camino-costa-rica-info')
export class CaminoCostaRicaController {
  constructor(private readonly caminoCostaRicaService: CaminoCostaRicaService) {}

  @Get()
  async findOne(): Promise<CaminoCostaRicaInfo> {
    try {
      const info = await this.caminoCostaRicaService.findOne();
      return info;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Re-throw other errors
    }
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('mainImage', {
      storage: diskStorage({
        destination: './uploads/camino-costa-rica',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `camino-costa-rica-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Body() updateData: Partial<CaminoCostaRicaInfo>,
    @UploadedFile() file?: any, // Changed from Express.Multer.File to any
  ): Promise<CaminoCostaRicaInfo> {
    // Create a copy of updateData to avoid modifying the original object
    const updatedInfo: Partial<CaminoCostaRicaInfo> = { ...updateData };
    // If a new image was uploaded, add the path to the updateData
    if (file) {
      updatedInfo.mainImageSrc = `/uploads/camino-costa-rica/${file.filename}`;
    }
    // If mainImageSrc is explicitly set in body and no file, use body.mainImageSrc
    // If neither file nor body.mainImageSrc, existing mainImageSrc will be kept by the service
    return this.caminoCostaRicaService.update(updatedInfo);
  }
}