import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaminoCostaRicaInfo } from './entities/camino-costa-rica.entity';

@Injectable()
export class CaminoCostaRicaService {
  constructor(
    @InjectRepository(CaminoCostaRicaInfo)
    private readonly caminoCostaRicaRepository: Repository<CaminoCostaRicaInfo>,
  ) {}

  async findOne(): Promise<CaminoCostaRicaInfo> {
    const info = await this.caminoCostaRicaRepository.findOne({ where: {} });
    if (!info) {
      throw new NotFoundException('Camino Costa Rica information not found');
    }
    return info;
  }

  async update(updateData: Partial<CaminoCostaRicaInfo>): Promise<CaminoCostaRicaInfo> {
    // First check if there's any existing data
    let info = await this.caminoCostaRicaRepository.findOne({ where: {} });
    
    if (!info) {
      // If no data exists, create a new entry
      info = this.caminoCostaRicaRepository.create(updateData);
    } else {
      // Update existing data
      this.caminoCostaRicaRepository.merge(info, updateData);
    }
    
    return this.caminoCostaRicaRepository.save(info);
  }
}