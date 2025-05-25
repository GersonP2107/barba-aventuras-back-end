"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaminoCostaRicaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const camino_costa_rica_entity_1 = require("./entities/camino-costa-rica.entity");
let CaminoCostaRicaService = class CaminoCostaRicaService {
    caminoCostaRicaRepository;
    constructor(caminoCostaRicaRepository) {
        this.caminoCostaRicaRepository = caminoCostaRicaRepository;
    }
    async findOne() {
        const info = await this.caminoCostaRicaRepository.findOne({ where: {} });
        if (!info) {
            throw new common_1.NotFoundException('Camino Costa Rica information not found');
        }
        return info;
    }
    async update(updateData) {
        let info = await this.caminoCostaRicaRepository.findOne({ where: {} });
        if (!info) {
            info = this.caminoCostaRicaRepository.create(updateData);
        }
        else {
            this.caminoCostaRicaRepository.merge(info, updateData);
        }
        return this.caminoCostaRicaRepository.save(info);
    }
};
exports.CaminoCostaRicaService = CaminoCostaRicaService;
exports.CaminoCostaRicaService = CaminoCostaRicaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(camino_costa_rica_entity_1.CaminoCostaRicaInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CaminoCostaRicaService);
//# sourceMappingURL=camino-costa-rica.service.js.map