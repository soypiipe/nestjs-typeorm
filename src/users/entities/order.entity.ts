import { Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import { Customer } from './customer.entity';
import { OrderProduct } from './orderProduct.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    creatAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @Column({ type: 'date', nullable: true })
    date: Date;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[];

    @Expose()
    get products() {
        if (this.orderProducts) {
            return this.orderProducts
                .filter((item) => !!item)
                .map((item) => ({
                    ...item.product,
                    quantity: item.quantity,
                    itemId: item.id,
                }));
        }
        return [];
    }

    @Expose()
    get total() {
        if (this.orderProducts) {
            return this.orderProducts
                .filter((item) => !!item)
                .reduce((total, item) => {
                    const totalItem = item.product.price * item.quantity;
                    return total + totalItem;
                }, 0);
        }
        return 0;
    }
}
