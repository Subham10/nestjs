import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'config/config.interface';
import * as mysql from 'mysql2/promise';

@Injectable()
export class MysqlService implements OnModuleDestroy {
  private pool: mysql.Pool;

  constructor(private config: ConfigService) {
    this.createPool();
  }
  async query(sql: string, values?: any): Promise<any> {
    try {
      const [rows] = await this.pool.query(sql, values);
      return rows as any;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.close();
  }

  private async close() {
    try {
      await this.pool.end();
      console.log('MySQL connection pool closed');
    } catch (error) {
      console.error('Error closing MySQL connection pool:', error);
      throw error;
    }
  }
  private createPool() {
    const dbConfig = this.config.get<DatabaseConfig>('database');
    this.pool = mysql.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.db,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('MySQL connection pool created');
  }
  async beginTransaction(): Promise<void> {
    try {
      await this.pool.getConnection().then((conn: any) => conn.beginTransaction());
    } catch (error) {
      console.error('Error beginning transaction:', error);
      throw error;
    }
  }

  async commit(): Promise<void> {
    try {
      await this.pool.getConnection().then((conn: any) => conn.commit());
    } catch (error) {
      console.error('Error committing transaction:', error);
      throw error;
    }
  }

  async rollback(): Promise<void> {
    try {
      await this.pool.getConnection().then((conn:any) => conn.rollback());
    } catch (error) {
      console.error('Error rolling back transaction:', error);
      throw error;
    }
  }
}
