import { Body, Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({'cmd':'add_product'})
  async addProduct(@Body() prodData:any):Promise<any>{
    await this.productService.addProduct(prodData);
    return {"success":true,response:"Data Added"}
  }
  @MessagePattern({'cmd':'fetch_product'})
  async fetchProduct():Promise<any[]>{
    return await this.productService.findAllProducts()
  }
}
