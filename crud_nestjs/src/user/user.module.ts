import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
// import { MysqlService } from 'src/mysql/mysql.service';

@Module({
    controllers:[UserController],
    providers:[]
})
export class UserModule {}
