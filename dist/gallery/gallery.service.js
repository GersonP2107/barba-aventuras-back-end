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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const gallery_item_entity_1 = require("./entities/gallery-item.entity");
let GalleryService = class GalleryService {
    galleryRepository;
    constructor(galleryRepository) {
        this.galleryRepository = galleryRepository;
    }
    create(galleryItemData) {
        const newItem = this.galleryRepository.create(galleryItemData);
        return this.galleryRepository.save(newItem);
    }
    findAll() {
        return this.galleryRepository.find({ order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const item = await this.galleryRepository.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException(`Gallery item with ID "${id}" not found`);
        }
        return item;
    }
    async update(id, updateGalleryItemData) {
        const item = await this.galleryRepository.preload({
            id: id,
            ...updateGalleryItemData,
        });
        if (!item) {
            throw new common_1.NotFoundException(`Gallery item with ID "${id}" not found`);
        }
        return this.galleryRepository.save(item);
    }
    async remove(id) {
        const result = await this.galleryRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Gallery item with ID "${id}" not found`);
        }
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gallery_item_entity_1.GalleryItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map