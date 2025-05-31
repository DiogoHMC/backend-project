import { IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum CartStatus {
  ACTIVE = 'ACTIVE',
  CHECKOUT = 'CHECKOUT',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

export class CreateCartDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsEnum(CartStatus)
  status: CartStatus;
}
