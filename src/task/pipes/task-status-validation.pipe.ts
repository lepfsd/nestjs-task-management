import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {

	readonly allowebStatuses = [
		TaskStatus.OPEN,
		TaskStatus.IN_PROGRESS,
		TaskStatus.DONE
	];

	transform(value: any) {
		
		
		/*if(!this.isStatusValid(value)) {
			throw new BadRequestException(`${value} is not valid status`);
		}*/
		
		return value;
	}

	private isStatusValid(status: any) {
		const idx = this.allowebStatuses.indexOf(status);
		return idx !== -1;
	}
}