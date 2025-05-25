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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaminoCostaRicaInfo = void 0;
const typeorm_1 = require("typeorm");
let CaminoCostaRicaInfo = class CaminoCostaRicaInfo {
    id;
    headerSubtitle;
    headerTitle;
    headerParagraph;
    mainImageSrc;
    mainImageAlt;
    contentTitle;
    contentParagraph;
};
exports.CaminoCostaRicaInfo = CaminoCostaRicaInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CaminoCostaRicaInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], CaminoCostaRicaInfo.prototype, "headerSubtitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], CaminoCostaRicaInfo.prototype, "headerTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CaminoCostaRicaInfo.prototype, "headerParagraph", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], CaminoCostaRicaInfo.prototype, "mainImageSrc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], CaminoCostaRicaInfo.prototype, "mainImageAlt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], CaminoCostaRicaInfo.prototype, "contentTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CaminoCostaRicaInfo.prototype, "contentParagraph", void 0);
exports.CaminoCostaRicaInfo = CaminoCostaRicaInfo = __decorate([
    (0, typeorm_1.Entity)('camino_costa_rica_info')
], CaminoCostaRicaInfo);
//# sourceMappingURL=camino-costa-rica.entity.js.map