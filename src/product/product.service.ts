import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      console.log('Attempting to create product with data:', createProductDto);
  
      
      const product = await this.prisma.product.create({
        data: {
          ...createProductDto,
          name: createProductDto.name.toLowerCase(),
          description: createProductDto.description ? createProductDto.description.toLowerCase() : null
        },
      });
  
      console.log('Product created successfully:', product);
  
      if (!product) {
        throw new BadRequestException('Failed to create product');
      }
  
      return product;
    } catch (error) {
      console.error('Detailed Prisma error:', {
        name: error.name,
        message: error.message,
        code: error.code,
        meta: error.meta,
        stack: error.stack
      });
  
      if (error.code === 'P2002') {
        throw new BadRequestException('A product with this name already exists');
      }
  
      if (error.code === 'P2000') {
        throw new BadRequestException('Invalid input data');
      }
  
      throw new InternalServerErrorException(`Failed to create product: ${error.message}`);
    }
  }
  

  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true }
    });
  }

  async findOne(id: number) {
    try {
      if (!id || isNaN(id)) {
        throw new BadRequestException('Invalid product ID');
      }

      const product = await this.prisma.product.findFirst({
        where: { id },
        include: { category: true }
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error finding product: ${error.message}`);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const dataToUpdate = {
        ...updateProductDto,
        name: updateProductDto.name ? updateProductDto.name.toLowerCase() : undefined,
        description: updateProductDto.description ? updateProductDto.description.toLowerCase() : undefined,
      };
  
      return await this.prisma.product.update({
        where: { id },
        data: dataToUpdate,
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
  

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async findByNameOrCategory(name?: string, categoryId?: number, categoryName?: string) {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          AND: [
            name ? { name: { contains: name.toLowerCase() } } : {},
            categoryId ? { categoryId } : {},
            categoryName ? { category: { name: { contains: categoryName.toLowerCase() } } } : {}
          ]
        },
        include: { category: true }
      });
  
      return products;
    } catch (error) {
      throw new InternalServerErrorException(`Error finding products: ${error.message}`);
    }
  }
  
  
}
