import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    Products=[]
    async addProduct(product:any){
        this.Products.push(product)
    }
    async findAllProducts(){
        return this.Products
    }
}
