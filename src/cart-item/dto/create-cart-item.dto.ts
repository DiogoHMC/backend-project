import { IsNumber, Min, IsOptional } from 'class-validator';

export class CreateCartItemDto {
    @IsNumber()
    cartId: number;
  
    @IsNumber()
    productId: number;
  
    @IsNumber()
    @Min(1)
    @IsOptional()
    quantity?: number = 1;
  }
  