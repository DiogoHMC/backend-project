import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

//mexe com entity
@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto) {
    try {
      const cart = await this.prisma.cart.create({
        data: createCartDto,
      });
      return cart;
    } catch (error) {
      console.error('Detailed Prisma error:', {
        name: error.name,
        message: error.message,
        code: error.code,
        meta: error.meta,
        stack: error.stack
      });
      throw new InternalServerErrorException('Failed to create cart');
    }
  }
  

  async findAll() {
    try {
      const carts = await this.prisma.cart.findMany();
      console.log('Carts fetched successfully:', carts);
      return carts;
    } catch (error) {
      console.error('Error in cart service:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw new InternalServerErrorException('Failed to fetch carts');
    }
  }

  async findOne(id: number) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { id },
      });
      console.log('Cart fetched successfully:', cart);
      return cart;
    } catch (error) {
      console.error('Error in cart service:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw new InternalServerErrorException('Failed to fetch cart');
    }
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    try {
      const data = {
        ...updateCartDto,
        createdAt: updateCartDto.createdAt ? new Date(updateCartDto.createdAt) : undefined,
        updatedAt: updateCartDto.updatedAt ? new Date(updateCartDto.updatedAt) : undefined,
        //items: updateCartDto.items ? JSON.parse(updateCartDto.items) : undefined,
        status: updateCartDto.status
      };
  
      const cart = await this.prisma.cart.update({
        where: { id },
        data,
      });
  
      console.log('Cart updated successfully:', cart);
      return cart;
    } catch (error) {
      console.error('Error in cart service:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw new InternalServerErrorException('Failed to update cart');
    }
  }
  

  async remove(id: number) {
    try {
      const cart = await this.prisma.cart.delete({
        where: { id },
      });
      console.log('Cart deleted successfully:', cart);
      return cart;
    } catch (error) {
      console.error('Error in cart service:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw new InternalServerErrorException('Failed to delete cart');
    }
  }
}