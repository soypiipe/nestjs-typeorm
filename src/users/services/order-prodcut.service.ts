import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderProduct, UpdateOrderProduct } from '../dtos/orderProduct.dto';
import { Order } from '../entities/order.entity';
import { Product } from './../../products/entities/product.entity';
import { OrderProduct } from '../entities/orderProduct.entity';

@Injectable()
export class OrderProdcutService {

    constructor(@InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(OrderProduct) private orderProductRepo: Repository<OrderProduct>
    ){}

    findAll() {
        return this.orderProductRepo.find({
            relations: {
                order:{
                    customer: true
                }
            }
        });
    }

    findOne(id: number) {
        return this.orderProductRepo.findOne({ where: { id }, relations: ['order', 'product'] });
    }

    async create(data: CreateOrderProduct) {
        const order = await this.orderRepo.findOne({ where: { id: data.orderId } });
        const product = await this.productRepo.findOne({ where: { id: data.productId } });

        const newOrderProduct = new OrderProduct();
        newOrderProduct.order = order;
        newOrderProduct.product = product;
        newOrderProduct.quantity = data.quantity;

        return this.orderProductRepo.save(newOrderProduct);
    }

    async update(id: number, changes: UpdateOrderProduct) {
        const orderProduct = await this.orderProductRepo.findOne({ where: { id } });
        if (changes.orderId) {
            const order = await this.orderRepo.findOne({ where: { id: changes.orderId } });
            orderProduct.order = order;
        }
        if (changes.productId) {
            const product = await this.productRepo.findOne({ where: { id: changes.orderId } });
            orderProduct.product = product;
        }
        if (changes.quantity) {
            orderProduct.quantity = changes.quantity;
        }
        return this.orderProductRepo.save(orderProduct);
    }

    delete(id: number) {
        return this.orderProductRepo.delete(id);
    }
}
