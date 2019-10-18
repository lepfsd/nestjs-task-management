import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
	constructor(private taskService: TaskService) {}

	@Get()
	getAllTasks(): Task[] {
		return this.taskService.getAllTasks();
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string) {
		return this.taskService.getTaskById(id);
	}	

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.taskService.createTask(createTaskDto);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string) {
		this.taskService.deleteTask(id);
	} 
}
