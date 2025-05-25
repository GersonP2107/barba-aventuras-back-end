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
exports.CaminoCostaRicaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const camino_costa_rica_service_1 = require("./camino-costa-rica.service");
const multer_1 = require("multer");
const path_1 = require("path");
let CaminoCostaRicaController = class CaminoCostaRicaController {
    caminoCostaRicaService;
    constructor(caminoCostaRicaService) {
        this.caminoCostaRicaService = caminoCostaRicaService;
    }
    async findOne() {
        try {
            const info = await this.caminoCostaRicaService.findOne();
            return info;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async update(updateData, file) {
        const updatedInfo = { ...updateData };
        if (file) {
            updatedInfo.mainImageSrc = `/uploads/camino-costa-rica/${file.filename}`;
        }
        return this.caminoCostaRicaService.update(updatedInfo);
    }
};
exports.CaminoCostaRicaController = CaminoCostaRicaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaminoCostaRicaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('mainImage', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/camino-costa-rica',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `camino-costa-rica-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaminoCostaRicaController.prototype, "update", null);
exports.CaminoCostaRicaController = CaminoCostaRicaController = __decorate([
    (0, common_1.Controller)('api/camino-costa-rica-info'),
    __metadata("design:paramtypes", [camino_costa_rica_service_1.CaminoCostaRicaService])
], CaminoCostaRicaController);
//# sourceMappingURL=camino-costa-rica.controller.js.map