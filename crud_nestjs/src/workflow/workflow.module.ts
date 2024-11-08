import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
// import { MysqlService } from 'src/mysql/mysql.service';

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService],
})
export class WorkflowModule {}
