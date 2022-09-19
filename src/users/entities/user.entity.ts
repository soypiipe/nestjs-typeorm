import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;
    @Column({ type: "varchar", length: 255 })
    password: string;
    @Column({ type: "varchar", length: 255 })
    role: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToOne(() => Customer, customer => customer.user, {nullable: true})
    @JoinColumn({ name: 'customer_id' }) // debe ir en un solo lado
    customer: Customer;

}
