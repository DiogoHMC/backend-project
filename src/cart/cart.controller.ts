import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

//mexe com dto
//mapper dto cart to entity cart
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create')
  async create(@Body() createCartDto: CreateCartDto) {
    try {
      console.log('Received create cart request with data:', createCartDto);
      const cart = await this.cartService.create(createCartDto);
      console.log('Cart created successfully:', cart);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cart created successfully',
        data: cart
      };
    } catch (error) { 
      console.error('Error in cart controller:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to create cart',
          error: error.response?.message || error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('all')
  async findAll() {
    try {
      const carts = await this.cartService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Carts fetched successfully',
        data: carts
      };
    } catch (error) {
      console.error('Error in cart controller:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to fetch carts',
          error: error.response?.message || error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('get/:id') // parametro
  async findOne(@Param('id') id: string) {
    try {
      const cart = await this.cartService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart fetched successfully',
        data: cart
      };
    } catch (error) {
      console.error('Error in cart controller:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to fetch cart',
          error: error.response?.message || error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) { // o body recebe o dto e o json
    try {
      const cart = await this.cartService.update(+id, updateCartDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart updated successfully',
        data: cart
      };
    } catch (error) {
      console.error('Error in cart controller:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to update cart',
          error: error.response?.message || error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      const cart = await this.cartService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart deleted successfully',
        data: cart
      };
    } catch (error) {
      console.error('Error in cart controller:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
  }

  @Post('checkout/:id')
  async checkout(@Param('id') id: string) {
    try {
      const cart = await this.cartService.checkoutCart(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart moved to checkout successfully',
        data: cart,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to checkout cart',
          error: error.response?.message || error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @Post('complete/:id')
  async complete(@Param('id') id: string) {
    try {
      const cart = await this.cartService.completeCart(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart completed successfully',
        data: cart,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to complete cart',
          error: error.response?.message || error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @Post('abandon/:id')
  async abandon(@Param('id') id: string) {
    try {
      const cart = await this.cartService.abandonCart(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart abandoned successfully',
        data: cart,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to abandon cart',
          error: error.response?.message || error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  


}
