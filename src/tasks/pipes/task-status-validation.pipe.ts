import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status-enum';

export class TaskStatusValidationPipe implements PipeTransform {
    // readonly is a var that can not be modified even during run time by the class members
    readonly allowedStatuses = [
        TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE
    ];

    // type currently any because we don't know what type for value is, we don't really need the metadata, but for lecture purposes it will stay
    transform(value: any, metadata: ArgumentMetadata) {
        // value parameter holds the value of the parameter we are trying to validate

        // we need to throw an exception of 'value' is not apart of the TaskStatus Enum
        value = value.toUpperCase();

        //check to see if value is a valid TaskStatus
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`); // 400 http status error
        }


        return value;
    }




    private isStatusValid(status: any) {
        // will return -1 if what we provide is not an allowed status
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1; // return true if index is not -1
    }
}