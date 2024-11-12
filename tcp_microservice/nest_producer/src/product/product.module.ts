import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[ClientsModule.register([
    {
      name: 'PRODUCT_MICROSERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3003,
      },
    },
  ])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
