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
  @Input() boardId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>();

  @ViewChild('titleInput') titleInput!: ElementRef;
  @ViewChild('descInput') descInput!: ElementRef;
  
  editingField: string | null = null;
  isEditing: boolean = false;

  editForm = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    deadline: new FormControl<string>(''),
    priority: new FormControl<string>(''),
    status: new FormControl<string>('')
  });

  showDatePicker: boolean = false;
  selectedPriority: string = 'LOW';
  selectedStatus: string = 'PENDING';
  selectedDate: string = '';
  selectedTime: string = '';
  combinedDateTime: string = '';

  quickDateOptions = [
    {value: 'today' as const, label: 'Today'},
    {value: 'tomorrow' as const, label: 'Tomorrow'},
    {value: 'nextWeek' as const, label: 'Next Week'},
    {value: 'nextMonth' as const, label: 'Next Month'}
  ];

  constructor(private taskService: TaskServiceService) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.selectedPriority = this.task.priority || 'LOW';
    this.selectedStatus = this.task.status === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS';
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
      status: this.selectedStatus
    });
  }

  updateTask(updates: Partial<TaskResponse> = {}) {
    const baseUpdate = {
      ...this.task,
      ...updates,
      boardId: this.boardId,
      stageId: this.task.stage?.id || null,
      deadline: this.combinedDateTime ? this.combinedDateTime.replace(" ", "T") : null
    };

    this.taskService.updateTask(baseUpdate).subscribe({
      next: (updatedTask: TaskResponse) => {
        this.task = updatedTask;
        this.taskUpdated.emit();
        this.editingField = null;
        this.showDatePicker = false;
      },
      error: (error: Error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  // Date handling methods
  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private formatTimeForInput(date: Date): string {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }

  private formatDateTime(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }

  // UI handlers
  saveField(field: string) {
    if (this.editForm.valid) {
      const updates = {
        [field]: this.editForm.get(field)?.value
      };
      if (field === 'priority') updates['priority'] = this.selectedPriority;
      if (field === 'status') updates['status'] = this.selectedStatus;
      
      this.updateTask(updates);
    }
  }

  saveDateTime() {
    if (this.selectedDate && this.selectedTime) {
      const dateTime = new Date(this.selectedDate + 'T' + this.selectedTime);
      this.combinedDateTime = this.formatDateTime(dateTime);
      this.updateTask({ deadline: this.combinedDateTime });
    }
    this.showDatePicker = false;
  }

  // Other UI methods
  onClose() { this.close.emit(); }
  openDatePicker() { this.showDatePicker = true; }
  closeDatePicker() { this.showDatePicker = false; }

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

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  isOverdue(): boolean {
    if (!this.task.deadline) return false;
    const deadline = new Date(this.task.deadline);
    return deadline < new Date() && this.task.status !== 'COMPLETED';
  }

  removeDeadline(event?: Event) {
    if (event) {
      event.stopPropagation(); // Prevent opening the date picker when clicking remove
    }
    this.combinedDateTime = '';
    this.selectedDate = '';
    this.selectedTime = '';
    this.updateTask({ deadline: null });
    this.showDatePicker = false;
  }

  toggleComplete() {
    const newStatus = this.task.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
    this.updateTask({ status: newStatus });
  }

  updateTaskStatus(isChecked: boolean) {
    const newStatus = isChecked ? 'COMPLETED' : 'IN_PROGRESS';
    this.updateTask({ status: newStatus });
  }

  handleCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.updateTaskStatus(checkbox.checked);
  }
} 