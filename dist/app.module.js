"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const activities_module_1 = require("./activities/activities.module");
const tours_module_1 = require("./tours/tours.module");
const blog_module_1 = require("./blogs/blog.module");
const gallery_module_1 = require("./gallery/gallery.module");
const products_module_1 = require("./products/products.module");
const camino_costa_rica_module_1 = require("./camino_costa_rica/camino-costa-rica.module");
const hero_banner_module_1 = require("./hero-banner/hero-banner.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
                username: process.env.DB_USER || 'u638169348_root',
                password: process.env.DB_PASS || '?Y1j5I0w',
                database: process.env.DB_NAME || 'u638169348_barva_aventura',
                autoLoadEntities: true,
                synchronize: true,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
            }),
            activities_module_1.ActivitiesModule,
            tours_module_1.ToursModule,
            blog_module_1.BlogModule,
            gallery_module_1.GalleryModule,
            products_module_1.ProductsModule,
            camino_costa_rica_module_1.CaminoCostaRicaModule,
            hero_banner_module_1.HeroBannerModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map