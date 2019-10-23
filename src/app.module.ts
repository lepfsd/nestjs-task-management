import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TaskModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: null,
      database: 'nestjs-task-management',
      entities: [__dirname + '/../**/*.entity.ts'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
