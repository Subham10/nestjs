import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class WorkflowService {
  constructor(private readonly mysqlService: MysqlService){

  }
  async create(createWorkflowDto: CreateWorkflowDto) {
    try {
      await this.mysqlService.query('SET autocommit=0');
      await this.mysqlService.beginTransaction();
      let imageParams=[createWorkflowDto.clientId,createWorkflowDto.categoryId,createWorkflowDto.groupId,createWorkflowDto.itemName,createWorkflowDto.description,createWorkflowDto.createdBy]
      let result=await this.mysqlService.query('INSERT into lms_itemMaster(clientId,categoryId,groupId,itemName,description,createdBy) values(?,?,?,?,?,?)', imageParams);
      let insertedId=result.insertId;
      // console.log("Id:"+insertedId)
      let pathSql='INSERT into lms_itemImages(itemId,imagePath,createdBy) values(?,?,?)'
      let imagePathparams=[insertedId,createWorkflowDto.imagePath,createWorkflowDto.createdBy];
      
      await this.mysqlService.query(pathSql,imagePathparams );
      await this.mysqlService.commit();
      return {success:true,id:insertedId}
    } catch (error) {
      await this.mysqlService.rollback();
      return {success:false}
    }
  }

  async findAll() {
    try {
      const users = await this.mysqlService.query('SELECT * FROM lms_catalogueMaster');
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} workflow`;
  }

  update(id: number, updateWorkflowDto: UpdateWorkflowDto) {
    return `This action updates a #${id} workflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} workflow`;
  }
}
