import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService,
    @Inject('PRODUCT_MICROSERVICE') private readonly prod_client:ClientProxy
  ) {}

  @MessagePattern('createProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @MessagePattern('findAllProduct')
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern('findOneProduct')
  findOne(@Payload() id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern('updateProduct')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern('removeProduct')
  remove(@Payload() id: number) {
    return this.productService.remove(id);
  }
  @Post('addProduct')
  addProduct(@Body() prodData:any){
    return this.prod_client.send({'cmd':'add_product'},prodData)
  }
  @Get('fetchProduct')
  fetchProduct(){
    return this.prod_client.send({'cmd':'fetch_product'},{})
  }
}
