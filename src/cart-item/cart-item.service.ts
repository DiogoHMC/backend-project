import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const { cartId, productId, quantity } = createCartItemDto;

    try {
      // ✅ Validação: Cart existe?
      const cart = await this.prisma.cart.findUnique({ where: { id: cartId } });
      if (!cart) {
        throw new NotFoundException(`Cart with id ${cartId} not found`);
      }

      // ✅ Validação: Product existe?
      const product = await this.prisma.product.findUnique({ where: { id: productId } });
      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      const cartItem = await this.prisma.cartItem.create({
        data: {
          cartId,
          productId,
          quantity: quantity ?? 1,
        },
      });

      return cartItem;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create cart item');
    }
  }

  async findAll() {
    try {
      return await this.prisma.cartItem.findMany();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch cart items');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.cartItem.findUnique({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch cart item');
    }
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    try {
      return await this.prisma.cartItem.update({
        where: { id },
        data: {
          ...updateCartItemDto,
          quantity: updateCartItemDto.quantity ?? 1,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update cart item');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.cartItem.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete cart item');
    }
  }
}
