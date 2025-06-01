import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve categories');
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve category');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
