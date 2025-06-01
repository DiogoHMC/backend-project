import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, ProductModule, CartModule, CartItemModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
