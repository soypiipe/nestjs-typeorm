import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { Product } from './entities/product.entity';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
import { Brand } from './entities/brand.entity';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { Category } from './entities/category.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Category, Brand, Product])],
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, BrandsService, CategoriesService],
    exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule { }
