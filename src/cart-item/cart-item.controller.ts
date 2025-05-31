import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post('create')
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    try {
      const cartItem = await this.cartItemService.create(createCartItemDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cart item created successfully',
        data: cartItem,
      };
    } catch (error) {
      throw new HttpException('Failed to create cart item', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('all')
  async findAll() {
    try {
      const cartItems = await this.cartItemService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart items fetched successfully',
        data: cartItems,
      };
    } catch (error) {
      throw new HttpException('Failed to fetch cart items', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    try {
      const cartItem = await this.cartItemService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart item fetched successfully',
        data: cartItem,
      };
    } catch (error) {
      throw new HttpException(error.message || 'Failed to fetch cart item', HttpStatus.NOT_FOUND);
    }
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    try {
      const cartItem = await this.cartItemService.update(+id, updateCartItemDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart item updated successfully',
        data: cartItem,
      };
    } catch (error) {
      throw new HttpException('Failed to update cart item', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      const cartItem = await this.cartItemService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart item deleted successfully',
        data: cartItem,
      };
    } catch (error) {
      throw new HttpException('Failed to delete cart item', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
