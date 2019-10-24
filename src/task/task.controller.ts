import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from "./task-status.enum";

@Controller('task')
export class TaskController {
	constructor(private taskService: TaskService) {}

	@Get('/:id')
	getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
		return this.taskService.getTaskById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskService.createTask(createTaskDto);
	}

	@Delete('/:id')
	deleteTask(@Param('id', ParseIntPipe) id: number): void {
		this.taskService.deleteTask(id);
	} 

	@Patch('/:id/status')
	updateTaskStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', TaskStatusValidationPipe) status: TaskStatus,
	): Promise<Task> {
		return this.taskService.updateTaskStatus(id, status);
	}

	/*@Get()
	getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
		if(Object.keys(filterDto).length) {
			return this.taskService.getTaskWithFilters(filterDto);
		} else {
			return this.taskService.getAllTasks();
		}
		
	}

		

	

	

	 */
}
