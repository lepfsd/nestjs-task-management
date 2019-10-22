import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('task')
export class TaskController {
	constructor(private taskService: TaskService) {}

	@Get()
	getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
		if(Object.keys(filterDto).length) {
			return this.taskService.getTaskWithFilters(filterDto);
		} else {
			return this.taskService.getAllTasks();
		}
		
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string) {
		return this.taskService.getTaskById(id);
	}	

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.taskService.createTask(createTaskDto);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string) {
		this.taskService.deleteTask(id);
	} 

	@Patch('/:id/status')
	updateTaskStatus(
		@Param('id') id: string,
		@Body('status', TaskStatusValidationPipe) status: TaskStatus,
	): Task {
		return this.taskService.updateTaskStatus(id, status);
	}
}
