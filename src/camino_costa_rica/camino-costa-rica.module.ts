import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaminoCostaRicaService } from './camino-costa-rica.service';
import { CaminoCostaRicaController } from './camino-costa-rica.controller';
import { CaminoCostaRicaInfo } from './entities/camino-costa-rica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaminoCostaRicaInfo])],
  controllers: [CaminoCostaRicaController],
  providers: [CaminoCostaRicaService],
})
export class CaminoCostaRicaModule {}