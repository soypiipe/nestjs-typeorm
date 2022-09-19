import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderProduct {
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly orderId: number;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly productId: number;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly quantity: number;
}

export class UpdateOrderProduct extends PartialType(CreateOrderProduct) { }
