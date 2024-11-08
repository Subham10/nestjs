import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'config/config.interface';
import { MysqlService } from 'src/mysql/mysql.service';
@Controller('user')
export class UserController {
    constructor(private config: ConfigService,private readonly mysqlService: MysqlService) {

    }
    @Get('myself')
    getUserName(): string {

        return "Subham Chatterjee"
    }
    @Get('configValue')
    getConfigValue(): any {
        const dbHost=this.config.get<string>('DATABASE_HOST');

        // use "test" when "database.db" is not defined
        const db = this.config.get<string>('database.db', 'test');

        const dbConfig = this.config.get<DatabaseConfig>('database');
        return { host: dbHost, dbConfig, db:db}
    }
    @Post('addUser')
    createUser(@Body() createUser: CreateUserDTO) {
        return { name: createUser.name }
    }
}
