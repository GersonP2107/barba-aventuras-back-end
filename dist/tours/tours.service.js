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
exports.ToursService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tour_entity_1 = require("./tour.entity");
let ToursService = class ToursService {
    toursRepository;
    constructor(toursRepository) {
        this.toursRepository = toursRepository;
    }
    findAll() {
        return this.toursRepository.find({ where: { isActive: true } });
    }
    async findOne(id) {
        const tour = await this.toursRepository.findOne({ where: { id } });
        if (!tour) {
            throw new common_1.NotFoundException(`Tour with ID "${id}" not found`);
        }
        return tour;
    }
    async create(tour) {
        const newTour = this.toursRepository.create(tour);
        return this.toursRepository.save(newTour);
    }
    async update(id, tour) {
        await this.toursRepository.update(id, tour);
        return this.findOne(id);
    }
    async remove(id) {
        await this.toursRepository.delete(id);
    }
};
exports.ToursService = ToursService;
exports.ToursService = ToursService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tour_entity_1.Tour)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ToursService);
//# sourceMappingURL=tours.service.js.map