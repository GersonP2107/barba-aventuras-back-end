import { CaminoCostaRicaService } from './camino-costa-rica.service';
import { CaminoCostaRicaInfo } from './entities/camino-costa-rica.entity';
export declare class CaminoCostaRicaController {
    private readonly caminoCostaRicaService;
    constructor(caminoCostaRicaService: CaminoCostaRicaService);
    findOne(): Promise<CaminoCostaRicaInfo>;
    update(updateData: Partial<CaminoCostaRicaInfo>, file?: any): Promise<CaminoCostaRicaInfo>;
}
