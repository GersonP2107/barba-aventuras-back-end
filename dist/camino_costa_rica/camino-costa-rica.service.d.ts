import { Repository } from 'typeorm';
import { CaminoCostaRicaInfo } from './entities/camino-costa-rica.entity';
export declare class CaminoCostaRicaService {
    private readonly caminoCostaRicaRepository;
    constructor(caminoCostaRicaRepository: Repository<CaminoCostaRicaInfo>);
    findOne(): Promise<CaminoCostaRicaInfo>;
    update(updateData: Partial<CaminoCostaRicaInfo>): Promise<CaminoCostaRicaInfo>;
}
