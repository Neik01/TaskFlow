import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskResponse } from 'src/app/responses/ServerResponse';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.css']
})
export class TaskDetailModalComponent {
  @Input() task!: TaskResponse;
  @Output() close = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>();

  @ViewChild('titleInput') titleInput!: ElementRef;
  @ViewChild('descInput') descInput!: ElementRef;
  
  editingField: string | null = null;

  editForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    deadline: new FormControl(''),
    priority: new FormControl(''),
    status: new FormControl('')
  });

  showDatePicker: boolean = false;
  selectedPriority: string = 'LOW';
  selectedStatus: string = 'PENDING';
  selectedDate: string = '';
  selectedTime: string = '';
  combinedDateTime: string = '';
  isEditing: boolean = false;

  constructor(private taskService: TaskServiceService) {}

  ngOnInit() {
    this.selectedPriority = this.task.priority || 'LOW';
    this.selectedStatus = this.task.status || 'PENDING';
    if (this.task.deadline) {
      const date = new Date(this.task.deadline);
      this.selectedDate = this.formatDateForInput(date);
      this.selectedTime = this.formatTimeForInput(date);
      this.combinedDateTime = this.formatDateTime(date);
    }
    this.editForm.patchValue({
      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority,
      status: this.task.status
    });
  }

  onClose() {
    this.close.emit();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    if (this.editForm.valid) {
      const updatedTask = {
        ...this.task,
        ...this.editForm.value,
        deadline: this.combinedDateTime ? this.combinedDateTime.replace(" ", "T") : null,
        priority: this.selectedPriority,
        status: this.selectedStatus
      };

    //   this.taskService.updateTask(updatedTask).subscribe(() => {
    //     this.taskUpdated.emit();
    //     this.isEditing = false;
    //   });
    }
  }

  // Reuse your existing date/time handling methods
  openDatePicker(): void {
    this.showDatePicker = true;
  }

  closeDatePicker(): void {
    this.showDatePicker = false;
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private formatTimeForInput(date: Date): string {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }

  private formatDateTime(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }

  startEditing(field: string) {
    this.editingField = field;
    this.editForm.patchValue({
      [field]: this.task[field as keyof TaskResponse]
    });
    
    // Focus the input after it appears
    setTimeout(() => {
      if (field === 'title') this.titleInput?.nativeElement.focus();
      if (field === 'description') this.descInput?.nativeElement.focus();
    });
  }

  saveField(field: string) {
    if (this.editForm.valid) {
      const updates: any = {
        ...this.task,
        [field]: this.editForm.get(field)?.value
      };
      
      if (field === 'priority') updates.priority = this.selectedPriority;
      if (field === 'status') updates.status = this.selectedStatus;
      
      // this.taskService.updateTask(updates).subscribe(() => {
      //   this.task = updates;
      //   this.editingField = null;
      // });
    }
    this.editingField = null;
  }

  setQuickDate(option: 'today' | 'tomorrow' | 'nextWeek' | 'nextMonth'): void {
    const now = new Date();
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

  saveDateTime(): void {
    if (this.selectedDate && this.selectedTime) {
      const dateTime = new Date(this.selectedDate + 'T' + this.selectedTime);
      this.combinedDateTime = this.formatDateTime(dateTime);
      
      const updates = {
        ...this.task,
        deadline: this.combinedDateTime.replace(" ", "T")
      };

      // this.taskService.updateTask(updates).subscribe(() => {
      //   this.task = updates;
      //   this.showDatePicker = false;
      // });
    }
    this.showDatePicker = false;
  }
} 