import { IsString, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { CartStatus } from './create-cart.dto';

export class UpdateCartDto {
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsEnum(CartStatus)
  status?: CartStatus;
}
