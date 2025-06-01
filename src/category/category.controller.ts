import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryService.create(createCategoryDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Category created successfully',
        data: category
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to create category',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('all')
  async findAll() {
    try {
      const categories = await this.categoryService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Categories retrieved successfully',
        data: categories
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve categories',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const category = await this.categoryService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Category retrieved successfully',
        data: category
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve category',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    try {
      const category = await this.categoryService.update(id, updateCategoryDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Category updated successfully',
        data: category
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to update category',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('remove/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const category = await this.categoryService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Category deleted successfully',
        data: category
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to delete category',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
