import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, Index, JoinColumn} from 'typeorm';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity('products')
@Index(['price', 'stock'])
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, unique: true})
    name: string;

    @Column({type: 'text'})
    description: string;

    @Index()
    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @Column({type: 'int'})
    stock: number;

    @Column({type: 'varchar', length: 255})
    image: string;

    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date;

    @UpdateDateColumn({ name:'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable()
    categories: Category[];
}
