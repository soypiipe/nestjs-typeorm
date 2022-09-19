import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/orders.dto';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(Customer) private customerRepo: Repository<Customer>
    ){}

    findAll() {
        return this.orderRepo.find();
    }

    findOne(id: number) {
        const order = this.orderRepo.findOne({ where: { id }, relations: { orderProducts: {
            product: true
        } }});
        if (!order) {
            throw new NotFoundException(`Order #${id} not found`);
        }
        return order;
    }

    async create(data: CreateOrderDto) {
        const newOrder = new Order();
        if(data.customerId){
            const customer = await this.customerRepo.findOne({ where: { id: data.customerId } });
            if (!customer) {
                throw new NotFoundException(`Customer #${data.customerId} not found`);
            }
            newOrder.customer = customer;
        }

        return this.orderRepo.save(newOrder);
    }

    async update(id: number, changes: UpdateOrderDto) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException(`Order #${id} not found`);
        }

        if(changes.customerId){
            const customer = await this.customerRepo.findOne({ where: { id: changes.customerId } });
            if (!customer) {
                throw new NotFoundException(`Customer #${changes.customerId} not found`);
            }
            order.customer = customer;
        }

        return this.orderRepo.save(order);;
    }

    remove(id: number) {
        return this.orderRepo.delete(id);
    }
}
