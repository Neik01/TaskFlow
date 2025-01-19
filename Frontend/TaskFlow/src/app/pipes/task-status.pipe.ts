import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'IN_PROGRESS':
        return 'Đang thực hiện';
      case 'OVERDUE':
        return 'Quá hạn';
      case 'COMPLETED':
        return 'Hoàn thành';
      case 'PENDING':
        return 'Cần làm';
      default:
        return value;
    }
  }
} 