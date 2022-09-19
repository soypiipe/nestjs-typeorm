import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @Inject('PG') private clientPg: Client,
        private productsService: ProductsService,
        private customersService: CustomersService,
        private configService: ConfigService,
    ) { }

    findAll() {
        return this.userRepo.find({ relations: ['customer'] });
    }

    async findOne(id: number) {
        const user = await this.userRepo.findOne({ where: { id }, relations: ['customer'] });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    async create(data: CreateUserDto) {
        const newUser = this.userRepo.create(data);
        if(data.customerId){
            const customer = await this.customersService.findOne(data.customerId);
            if(!customer){
                throw new NotFoundException(`Customer #${data.customerId} not found`);
            }
            newUser.customer = customer;
        }
        return this.userRepo.save(newUser);
    }

    async update(id: number, changes: UpdateUserDto) {
        const user = await this.userRepo.findOne({ where: { id } });
        this.userRepo.merge(user, changes);

        return this.userRepo.save(user);
    }

    remove(id: number) {
        return this.userRepo.delete(id);
    }

    async getOrderByUser(id: number) {
        const user = this.findOne(id);
        return {
            date: new Date(),
            user,
            products: await this.productsService.findAll(),
        };
    }
    getTasks() {
        return new Promise((resolve, reject) => {
            this.clientPg.query('SELECT * FROM task', (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            });
        });
    }
}
