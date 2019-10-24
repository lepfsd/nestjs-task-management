import { Injectable, BadGatewayException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskService {
	

	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository
	) {

	}

	async getTaskById(id: number): Promise<Task> {
		const found = await this.taskRepository.findOne(id);

		if(!found) {
			throw new NotFoundException(`Task with id ${id} not found`);
		}

		return found;
	}

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {

		return this.taskRepository.createTask(createTaskDto);
	}

	async deleteTask(id: number): Promise<void> {
		const result = await this.taskRepository.delete(id);
		console.log(result);
		if(result.affected === 0) {
			throw new NotFoundException(`Task with id ${id} not found`);
		}
	}

	async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
		const task = await this.getTaskById(id);
		task.status = status;
		await task.save();
		return task; 
	}

	getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.taskRepository.getTasks(filterDto);
	}

	/*getAllTasks(): Task[] {
		return this.tasks;
	}

	getTaskWithFilters(filterDto: GetTasksFilterDto) {
		const { status, search } = filterDto;
		let tasks = this.getAllTasks();
		if(status) {
			tasks = tasks.filter(task => task.status === status);
		}
		if(search) {
			tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
		}
		return tasks;
	} */
}