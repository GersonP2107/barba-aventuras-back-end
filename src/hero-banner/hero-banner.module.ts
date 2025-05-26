import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroBannerController } from './hero-banner.controller';
import { HeroBannerService } from './hero-banner.service';
import { HeroBanner } from './entities/hero-banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeroBanner])],
  controllers: [HeroBannerController],
  providers: [HeroBannerService],
  exports: [HeroBannerService],
})
export class HeroBannerModule {}