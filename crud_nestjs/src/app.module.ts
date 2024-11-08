import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { WorkflowModule } from './workflow/workflow.module';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MysqlService } from './mysql/mysql.service';
import config from 'config/config';

@Global() // Marking the module as global
@Module({
  imports: [UserModule, CommonModule, WorkflowModule,
    ConfigModule.forRoot({
      isGlobal: true,load:[config],cache: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_INTERCEPTOR,
    useClass: TokenInterceptor,
  }, MysqlService,],
  exports: [MysqlService], // Exporting the MysqlService to make it available globally
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(LoggerMiddleware)
    .forRoutes('*')
  }
}
