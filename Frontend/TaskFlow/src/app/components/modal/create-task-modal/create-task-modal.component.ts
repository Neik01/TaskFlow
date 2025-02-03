import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BoardResponse } from 'src/app/responses/ServerResponse';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css']
})
export class CreateTaskModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
 
  @Input() boardId!: number;
  @Input() stageId!: number;
  showDatePicker: boolean = false;
  selectedPriority: string = 'LOW';
  selectedDate: string = ''; 
  selectedTime: string = ''; 
  combinedDateTime: string =''
  createForm!:FormGroup;
  boardList:BoardResponse[] = [];
  selectedStatus: string = 'PENDING';
  quickDateOptions: Array<{label: string, value: 'today' | 'tomorrow' | 'nextWeek' | 'nextMonth'}> = [
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'Next Week', value: 'nextWeek' },
    { label: 'Next Month', value: 'nextMonth' }
  ];
  selectedStageId: number | null = null;
  stages: any[] = [];
  constructor(readonly fb:FormBuilder, readonly ts:TaskServiceService, private boardService: BoardService){}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [''],
      description: [''],
      deadline: [''],
      priority: [''],
      boardId: [''],
      stageId: [null]  // Initialize with null
    });

    // Get stages for the board
    this.boardService.getBoardById(this.boardId).subscribe(board => {
      this.stages = board.stages;
      this.selectedStageId = this.stageId || null;
      // Update form's stageId when stages are loaded
      this.createForm.patchValue({ stageId: this.selectedStageId });
    });
  }

  submitCreateForm() {
    if(this.createForm.valid) {
      const formData = {
        ...this.createForm.value,
        deadline: this.combinedDateTime.replace(" ","T"),
        priority: this.selectedPriority,
        boardId: this.boardId,
        stageId: this.selectedStageId  // Make sure stageId is included
      };

      this.ts.createTask(formData).subscribe(res => {
        console.log(res);
        this.close.emit();
      });
    }
  }

  onCancel() {
    this.close.emit();
  }

  openDatePicker(): void {
    this.showDatePicker = true;
  }

  closeDatePicker(): void {
    this.showDatePicker = false;
  }


  //if select date, not select time, auto set time to 00:00 that day, if selected date is today, set it to 23:59
  //if select time, not date, set it to tomorrow if selected time less than right now, otherwise set date today

  saveDateTime(): void {
    const now = new Date();
    let adjustedDateTime;

    if (this.selectedDate && !this.selectedTime) {
      // Only date selected
      adjustedDateTime = new Date(this.selectedDate);
      if (adjustedDateTime.toDateString() === now.toDateString()) {
        // If the selected date is today, set the time to 23:59
        adjustedDateTime.setHours(23, 59, 0, 0);
      } else {
        // Otherwise, set the time to 00:00
        adjustedDateTime.setHours(0, 0, 0, 0);
      }
    } else if (!this.selectedDate && this.selectedTime) {
      // Only time selected
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      adjustedDateTime = new Date(now);
      adjustedDateTime.setHours(hours, minutes, 0, 0);

      if (adjustedDateTime < now) {
        // If the selected time is earlier than now, set the date to tomorrow
        adjustedDateTime.setDate(adjustedDateTime.getDate() + 1);
      }
    } else if(!this.selectedDate && !this.selectedTime) {
      return;
    } else if (this.selectedDate && this.selectedTime) {
      // Both date and time selected
      adjustedDateTime = new Date(this.selectedDate);
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      adjustedDateTime.setHours(hours, minutes, 0, 0);
    }

    this.combinedDateTime = this.formatDateTime(adjustedDateTime!);
    this.closeDatePicker();
  }

 
  formatDateTime(date: Date): string {
    // Keep ISO format for backend and internal use
    const isoString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return isoString;
  }

setQuickDate(option: 'today' | 'tomorrow' | 'nextWeek' | 'nextMonth') {
  let date = new Date();

  switch (option) {
    case 'today':
      date.setHours(23, 59, 0, 0);
      break;
    case 'tomorrow':
      date.setDate(date.getDate() + 1);
      date.setHours(23, 59, 0, 0);
      break;
    case 'nextWeek':
      date.setDate(date.getDate() + 7);
      date.setHours(23, 59, 0, 0);
      break;
    case 'nextMonth':
      date.setMonth(date.getMonth() + 1);
      date.setHours(23, 59, 0, 0);
      break;
  }

  this.selectedDate = this.formatDateForInput(date);
  this.selectedTime = this.formatTimeForInput(date);
  this.saveDateTime();
}

private formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0]; // Returns yyyy-MM-dd format
}

private formatTimeForInput(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

onDateInput(event: any): void {
  this.selectedDate = event.target.value;
  // Convert to Date object and format as needed
  const date = new Date(event.target.value);
  if (!isNaN(date.getTime())) {
    // Valid date
    this.selectedDate = date.toISOString().split('T')[0];
  }
}

}
