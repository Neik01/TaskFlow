import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css']
})
export class CreateTaskModalComponent {
  @Output() close = new EventEmitter<void>();
  showDatePicker: boolean = false;

  selectedDate: string = ''; // Will store selected date
  selectedTime: string = ''; // Will store selected time
  combinedDateTime: string =''

  onCancel() {
    this.close.emit();
  }

  openDatePicker(): void {
    this.showDatePicker = true;
  }

  closeDatePicker(): void {
    this.showDatePicker = false;
  }

  saveDateTime(): void {
    if (this.selectedDate || this.selectedTime) {
      this.combinedDateTime = `${this.selectedDate} ${this.selectedTime}`;
      
    } else {
      console.warn('Please select both date and time.');
    }
    this.closeDatePicker();
  }
}
