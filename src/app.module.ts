import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesModule } from './activities/activities.module';
import { ToursModule } from './tours/tours.module';
import { BlogModule } from './blogs/blog.module';
import { GalleryModule } from './gallery/gallery.module';
import { ProductsModule } from './products/products.module';
import { CaminoCostaRicaModule } from './camino_costa_rica/camino-costa-rica.module';
import { HeroBannerModule } from './hero-banner/hero-banner.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USER || 'u638169348_root',
      password: process.env.DB_PASS || '?Y1j5I0w',
      database: process.env.DB_NAME || 'u638169348_barva_aventura',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Solo en desarrollo, no en producción
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ActivitiesModule,
    ToursModule,
    BlogModule,
    GalleryModule, // Make sure GalleryModule is here
    ProductsModule,
    CaminoCostaRicaModule,
    HeroBannerModule,
  ],
})
export class AppModule {}