import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {

	readonly allowebStatuses = [
		TaskStatus.OPEN,
		TaskStatus.IN_PROGRESS,
		TaskStatus.DONE
	];

	transform(value: any) {
		
		value = value.toUpperCase();

		if(!this.isStatusValid(value)) {
			throw new BadRequestException(`${value} is not valid status`);
		}
		
		return value;
	}

	private isStatusValid(status: any) {
		const idx = this.allowebStatuses.indexOf(status);
		return idx !== -1;
	}
}