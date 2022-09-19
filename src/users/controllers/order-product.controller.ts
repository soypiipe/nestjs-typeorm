import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateOrderProduct, UpdateOrderProduct } from '../dtos/orderProduct.dto';
import { OrderProdcutService } from '../services/order-prodcut.service';

@Controller('order-product')
export class OrderProductController {
    constructor(private orderProductService: OrderProdcutService) { }

    @Get('')
    findAll() {
        return this.orderProductService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.orderProductService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateOrderProduct) {
        return this.orderProductService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateOrderProduct
    ) {
        return this.orderProductService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.orderProductService.delete(id);
    }
}
