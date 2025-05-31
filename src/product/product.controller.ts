import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      console.log('Received create product request with data:', createProductDto);
      
      const product = await this.productService.create(createProductDto);
      
      console.log('Product created successfully:', product);
      
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Product created successfully',
        data: product
      };
    } catch (error) {
      console.error('Error in product controller:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to create product',
          error: error.response?.message || error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('all')
  async findAll() {
    try {
      const products = await this.productService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Products retrieved successfully',
        data: products
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve products',
          error: error.response?.message || error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await this.productService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Product retrieved successfully',
        data: product
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve product',
          error: error.response?.message || error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    try {
      const product = await this.productService.update(id, updateProductDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Product updated successfully',
        data: product
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to update product',
          error: error.response?.message || error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await this.productService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Product deleted successfully',
        data: product
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to delete product',
          error: error.response?.message || error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
